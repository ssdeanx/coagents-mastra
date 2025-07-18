import { Link, FileText, Globe } from "lucide-react";

/**
 * Validates if a given string is a valid URL
 * @param url - The URL string to validate
 * @returns true if valid URL, false otherwise
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Detects the type of resource based on URL patterns
 * @param url - The URL to analyze
 * @returns Resource type classification
 */
export const detectResourceType = (url: string): 'web' | 'document' | 'academic' | 'news' => {
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

/**
 * Gets the appropriate icon component for a resource URL
 * @param url - The resource URL (optional)
 * @returns Lucide React icon component
 */
export const getResourceIcon = (url?: string) => {
  if (!url) {
    return Link;
  }
  const type = detectResourceType(url);
  switch (type) {
    case 'document': return FileText;
    case 'academic': return Globe;
    case 'news': return Globe;
    default: return Link;
  }
};
