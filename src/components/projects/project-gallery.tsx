"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <div>
      {/* معرض الصور المصغرة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative h-48 rounded-lg overflow-hidden"
          >
            <Image
              src={image}
              alt={`صورة المشروع ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* عارض الصور */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* زر الإغلاق */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* زر السابق */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* الصورة */}
            <div className="relative w-full h-full p-8">
              <Image
                src={images[selectedImage]}
                alt={`صورة المشروع ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* زر التالي */}
            <button
              onClick={goToNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 