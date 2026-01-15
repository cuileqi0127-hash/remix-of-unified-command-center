import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

export interface SelectedImage {
  id: string;
  url: string;
  prompt?: string;
}

interface ImageCapsuleProps {
  image: SelectedImage;
  onRemove: (id: string) => void;
}

export function ImageCapsule({ image, onRemove }: ImageCapsuleProps) {
  // Truncate prompt for display
  const displayText = image.prompt 
    ? image.prompt.length > 8 
      ? image.prompt.slice(0, 8) + '...' 
      : image.prompt
    : '图片';

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className={cn(
            "group relative inline-flex items-center gap-1.5 rounded-full",
            "bg-muted/60 border border-border/50 px-1.5 py-1",
            "hover:bg-muted hover:border-border transition-colors cursor-pointer"
          )}
        >
          {/* Thumbnail */}
          <div className="h-6 w-6 shrink-0 overflow-hidden rounded-md">
            <img
              src={image.url}
              alt={image.prompt || 'Selected image'}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
          
          {/* Text Label */}
          <span className="text-xs text-foreground/80 font-medium pr-0.5">
            {displayText}
          </span>
          
          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(image.id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent 
        side="top" 
        align="start"
        sideOffset={8}
        className="w-auto p-2 bg-background/95 backdrop-blur-sm"
      >
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <img
              src={image.url}
              alt={image.prompt || 'Preview'}
              className="max-w-[240px] max-h-[240px] object-contain"
            />
          </div>
          {image.prompt && (
            <p className="text-xs text-muted-foreground max-w-[240px] line-clamp-2">
              {image.prompt}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
