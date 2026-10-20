import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/images";
import { AiBadge } from "./ui";

/**
 * A fixed-ratio picture slot. Shows the configured photograph, or an
 * illustration until the family supplies one. The ratio is reserved up front,
 * so swapping in a photo never shifts the layout.
 */
export function PhotoFrame({
  photo,
  fallback,
  sizes,
  priority = false,
  className = "",
}: {
  photo: Photo | null;
  fallback: ReactNode;
  /** Name of the slot in src/content/images.ts (for readability where it's used). */
  slot?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={photo.focus ? { objectPosition: photo.focus } : undefined}
          />
          {/* Bottom-left: the hero's decorative tape covers the bottom-right corner. */}
          {photo.aiGenerated && <AiBadge className="bottom-2.5 left-2.5" />}
        </>
      ) : (
        <div className="absolute inset-0 [&>svg]:h-full [&>svg]:w-full">{fallback}</div>
      )}
    </div>
  );
}
