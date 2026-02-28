'use client';

import { useState, useEffect } from 'react';
import ImageGallery from "@/ui/components/gallery/ImageGallery";

const GALLERY_IMAGES = [
  { src: "/gori.png", alt: "Gori" },
  { src: "/crocs2.png", alt: "Snap" },
  { src: "/crow.png", alt: "Crowley" },
  { src: "/foxy.png", alt: "Foxy" },
  { src: "/bear.png", alt: "Bruno" },
  { src: "/bulldog.png", alt: "Tank" },
  { src: "/redPanda.png", alt: "Rusty" },
  { src: "/tiger2.png", alt: "Blaze" },
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
