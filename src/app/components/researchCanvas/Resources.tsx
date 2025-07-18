import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Trash2, ExternalLink, FileText, Globe, BookOpen, Star } from "lucide-react";
import { Resource } from "@/lib/types";
import { truncateUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Enhanced Resources Component
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - Resource type indicators
 * - Improved hover effects
 * - Better responsive design
 * - Enhanced accessibility
 */

interface EnhancedResource extends Resource {
  type?: 'document' | 'web' | 'academic' | 'news';
  confidence?: number;
  lastAccessed?: Date;
  tags?: string[];
}

type ResourcesProps = {
  resources: EnhancedResource[];
  customWidth?: number;
  handleCardClick?: (resource: EnhancedResource) => void;
  removeResource?: (resourceUrl: string) => void;
  showMetadata?: boolean;
  layout?: 'grid' | 'list';
};

const getResourceIcon = (type?: string) => {
  switch (type) {
    case 'document':
      return FileText;
    case 'academic':
      return BookOpen;
    case 'news':
      return Globe;
    default:
      return ExternalLink;
  }
};

const getResourceTypeColor = (type?: string) => {
  switch (type) {
    case 'document':
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'academic':
      return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    case 'news':
      return 'bg-green-500/20 text-green-300 border-green-400/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};

export function Resources({
  resources,
  handleCardClick,
  removeResource,
  customWidth = 320,
  showMetadata = true,
  layout = 'grid'
}: ResourcesProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No resources found</p>
        <p className="text-sm mt-1">Add resources to see them here</p>
      </div>
    );
  }

  const containerClass = layout === 'grid'
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    : "flex space-x-3 overflow-x-auto pb-2";

  return (
    <div data-test-id="resources" className={containerClass}>
      {resources.map((resource, idx) => {
        const ResourceIcon = getResourceIcon(resource.type);
        const typeColorClass = getResourceTypeColor(resource.type);

        return (
          <Card
            data-test-id={`resource`}
            key={idx}
            className={cn(
              "glass border-white/10 hover:glass-strong transition-all duration-200 group",
              handleCardClick ? "cursor-pointer hover:scale-[1.02]" : "",
              layout === 'list' ? "flex-none" : ""
            )}
            style={{ width: layout === 'list' ? `${customWidth}px` : 'auto' }}
            onClick={() => handleCardClick?.(resource)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-lg", typeColorClass)}>
                    <ResourceIcon className="h-3 w-3" />
                  </div>
                  {resource.type && (
                    <Badge variant="outline" className={cn("text-xs", typeColorClass)}>
                      {resource.type}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {resource.confidence && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-gray-300">
                        {(resource.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}

                  {removeResource && (
                    <Button
                      data-test-id="remove-resource"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeResource?.(resource.url);
                      }}
                      aria-label={`Remove ${resource.title}`}
                    >
                      <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-400" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                      {resource.description.length > 150
                        ? resource.description.slice(0, 150) + "..."
                        : resource.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    title={resource.url}
                    onClick={(e) => e.stopPropagation()}>
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${resource.url}`}
                      alt="favicon"
                      width={12}
                      height={12}
                      className="w-3 h-3"
                      unoptimized
                      onError={({ currentTarget }) => {
                        currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="truncate max-w-[200px]">
                      {truncateUrl(resource.url)}
                    </span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </div>

                {showMetadata && (resource.tags || resource.lastAccessed) && (
                  <div className="pt-2 border-t border-white/10">
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {resource.tags.slice(0, 3).map((tag, tagIdx) => (
                          <Badge key={tagIdx} variant="secondary" className="text-xs px-1.5 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {resource.lastAccessed && (
                      <p className="text-xs text-gray-500">
                        Last accessed: {resource.lastAccessed.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
