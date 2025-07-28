'use client';

import OptimizedImage from './OptimizedImage';
import { useImagePreloader } from './hooks/useImagePreloader';

export default function ImageGallery({ images = [] }) {
  const imageUrls = images.map(img => img.src);
  const { loadedImages, failedImages } = useImagePreloader(imageUrls);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
          <OptimizedImage
            src={image.src}
            alt={image.alt || `Image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={index < 3}
          />
          {loadedImages.has(image.src) && (
            <div className="absolute top-2 left-2 bg-green-500 w-2 h-2 rounded-full" />
          )}
          {failedImages.has(image.src) && (
            <div className="absolute top-2 left-2 bg-red-500 w-2 h-2 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}