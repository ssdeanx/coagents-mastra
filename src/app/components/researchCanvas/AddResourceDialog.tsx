import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { PlusCircle, Plus, Link, FileText, Globe } from "lucide-react";
import { Resource } from "@/lib/types";
import { useState } from "react";

/**
 * Enhanced Add Resource Dialog
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - URL validation and preview
 * - Resource type detection
 * - Better form validation
 */

type AddResourceDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newResource: Resource;
  setNewResource: (resource: Resource) => void;
  addResource: () => void;
};

export function AddResourceDialog({
  isOpen,
  onOpenChange,
  newResource,
  setNewResource,
  addResource,
}: AddResourceDialogProps) {
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [resourceType, setResourceType] = useState<'web' | 'document' | 'academic' | 'news'>('web');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const detectResourceType = (url: string): 'web' | 'document' | 'academic' | 'news' => {
    if (url.includes('arxiv.org') || url.includes('scholar.google')) {
      return 'academic';
    }
    if (url.includes('.pdf') || url.includes('.doc')) {
      return 'document';
    }
    if (url.includes('news') || url.includes('reuters') || url.includes('bbc')) {
      return 'news';
    }
    return 'web';
  };

  const handleUrlChange = (url: string) => {
    const valid = url === '' || validateUrl(url);
    setIsValidUrl(valid);
    if (valid && url) {
      setResourceType(detectResourceType(url));
    }
    setNewResource({ ...newResource, url });
  };

  const getResourceIcon = () => {
    switch (resourceType) {
      case 'document': return FileText;
      case 'academic': return Globe;
      case 'news': return Globe;
      default: return Link;
    }
  };

  const ResourceIcon = getResourceIcon();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="glass border-white/20 text-white hover:glass-strong transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/20 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <ResourceIcon className="h-5 w-5" />
            Add New Resource
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* URL Input with validation */}
          <div className="space-y-2">
            <Label htmlFor="new-url" className="text-white font-medium">
              Resource URL
            </Label>
            <Input
              id="new-url"
              placeholder="https://example.com/resource"
              value={newResource.url || ""}
              onChange={(e) => handleUrlChange(e.target.value)}
              aria-label="New resource URL"
              className={`glass border-white/20 text-white placeholder:text-gray-400 ${
                isValidUrl ? '' : 'border-red-400'
              }`}
            />
            {!isValidUrl && (
              <p className="text-red-400 text-sm">Please enter a valid URL</p>
            )}
            {newResource.url && isValidUrl && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/30 text-white">
                  <ResourceIcon className="h-3 w-3 mr-1" />
                  {resourceType}
                </Badge>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="new-title" className="text-white font-medium">
              Resource Title
            </Label>
            <Input
              id="new-title"
              placeholder="Enter a descriptive title"
              value={newResource.title || ""}
              onChange={(e) => {
                setNewResource({ ...newResource, title: e.target.value });
              }}
              aria-label="New resource title"
              className="glass border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="new-description" className="text-white font-medium">
              Resource Description
            </Label>
            <Textarea
              id="new-description"
              placeholder="Describe what this resource contains and why it's useful..."
              value={newResource.description || ""}
              onChange={(e) => {
                setNewResource({
                  ...newResource,
                  description: e.target.value,
                });
              }}
              aria-label="New resource description"
              className="glass border-white/20 text-white placeholder:text-gray-400 min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 glass border-white/20 text-white hover:glass-strong"
          >
            Cancel
          </Button>
          <Button
            onClick={addResource}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={
              !newResource.url ||
              !newResource.title ||
              !newResource.description ||
              !isValidUrl
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
