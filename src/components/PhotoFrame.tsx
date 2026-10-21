import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/images";
import { AiBadge } from "./ui";

/**
 * A fixed-ratio picture slot. Shows the configured picture, or an
 * illustration until the family supplies one. The ratio is reserved up front,
 * so swapping in a photo never shifts the layout.
 */
export function PhotoFrame({
  photo,
  fallback,
  sizes,
  className = "",
  imgClassName = "",
}: {
  photo: Photo | null;
  fallback: ReactNode;
  /** Name of the slot in src/content/images.ts (for readability where it's used). */
  slot?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
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
            className={`object-cover ${imgClassName}`}
            style={photo.focus ? { objectPosition: photo.focus } : undefined}
          />
          {photo.aiGenerated && <AiBadge className="bottom-3 left-3" />}
        </>
      ) : (
        <div className="absolute inset-0 [&>svg]:h-full [&>svg]:w-full">{fallback}</div>
      )}
    </div>
  );
}
