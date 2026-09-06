'use client';

import { useState, useEffect } from 'react';
import ImageGallery from "@/ui/components/gallery/ImageGallery";

const GALLERY_IMAGES = [
  { src: "/gori.webp", alt: "Gori" },
  { src: "/crocs2.webp", alt: "Snap" },
  { src: "/crow.webp", alt: "Crowley" },
  { src: "/foxy.webp", alt: "Foxy" },
  { src: "/bear.webp", alt: "Bruno" },
  { src: "/bulldog.webp", alt: "Tank" },
  { src: "/redPanda.webp", alt: "Rusty" },
  { src: "/tiger2.webp", alt: "Blaze" },
];

const MOBILE_IMAGE_COUNT = 4;

const ImageGalleryDemo = () => {
  const [images, setImages] = useState(GALLERY_IMAGES);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setImages(mq.matches ? GALLERY_IMAGES.slice(0, MOBILE_IMAGE_COUNT) : GALLERY_IMAGES);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="min-h-screen h-[700px] flex justify-center items-center w-full rounded-lg overflow-hidden">
        <ImageGallery images={images} />
    </div>
  );
};

export { ImageGalleryDemo };
