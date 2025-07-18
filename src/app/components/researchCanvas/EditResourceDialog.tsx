import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Resource } from "@/lib/types";
import { validateUrl, detectResourceType, getResourceIcon } from "@/lib/resource-utils";
import { Edit3, Save, X } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Enhanced Edit Resource Dialog
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - URL validation and preview
 * - Resource type detection
 * - Better form validation
 * - Unsaved changes warning
 */

type EditResourceDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  editResource: Resource | null;
  setEditResource: (
    resource: ((prev: Resource | null) => Resource | null) | Resource | null
  ) => void;
  updateResource: () => void;
};

export function EditResourceDialog({
  isOpen,
  onOpenChange,
  editResource,
  setEditResource,
  updateResource,
}: EditResourceDialogProps) {
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalResource, setOriginalResource] = useState<Resource | null>(null);

  useEffect(() => {
    if (editResource && isOpen) {
      setOriginalResource({ ...editResource });
      setHasChanges(false);
    }
  }, [editResource, isOpen]);

  // Memoize the resource icon component based on the URL
  const ResourceIcon = useMemo(() => {
    return getResourceIcon(editResource?.url);
  }, [editResource?.url]);

  // Memoize the resource type detection
  const resourceType = useMemo(() => {
    return editResource?.url ? detectResourceType(editResource.url) : 'web';
  }, [editResource?.url]);

  // Memoized URL validation callback
  const validateUrlCallback = useCallback((url: string) => {
    return validateUrl(url);
  }, []);

  const handleFieldChange = (field: keyof Resource, value: string) => {
    if (field === 'url') {
      const trimmedValue = value.trim();
      const valid = trimmedValue === '' || validateUrlCallback(trimmedValue);
      setIsValidUrl(valid);
    }

    setEditResource((prev) => {
      if (!prev) {
        return null;
      }
      const updated = { ...prev, [field]: value };

      // Check if there are changes
      const changed = originalResource && (
        updated.url !== originalResource.url ||
        updated.title !== originalResource.title ||
        updated.description !== originalResource.description
      );
      setHasChanges(!!changed);

      return updated;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/20 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Edit Resource
            {hasChanges && (
              <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
                Unsaved
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* URL Input with validation */}
          <div className="space-y-2">
            <Label htmlFor="edit-url" className="text-white font-medium">
              Resource URL
            </Label>
            <Input
              id="edit-url"
              placeholder="https://example.com/resource"
              value={editResource?.url || ""}
              onChange={(e) => handleFieldChange('url', e.target.value)}
              aria-label="Edit resource URL"
              className={`glass border-white/20 text-white placeholder:text-gray-400 ${
                isValidUrl ? '' : 'border-red-400'
              }`}
            />
            {!isValidUrl && (
              <p className="text-red-400 text-sm">Please enter a valid URL</p>
            )}
            {editResource?.url && isValidUrl && (
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
            <Label htmlFor="edit-title" className="text-white font-medium">
              Resource Title
            </Label>
            <Input
              id="edit-title"
              placeholder="Enter a descriptive title"
              value={editResource?.title || ""}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              aria-label="Edit resource title"
              className="glass border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-white font-medium">
              Resource Description
            </Label>
            <Textarea
              id="edit-description"
              placeholder="Describe what this resource contains and why it's useful..."
              value={editResource?.description || ""}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              aria-label="Edit resource description"
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
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={updateResource}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={
              !editResource?.url ||
              !editResource?.title ||
              !editResource?.description ||
              !isValidUrl ||
              !hasChanges
            }
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
