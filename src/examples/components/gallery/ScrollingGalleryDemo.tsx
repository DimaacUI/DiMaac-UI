import ScrollingGallery from '@/ui/components/gallery/ScrollingGallery';
import React from 'react'

const ScrollingGalleryDemo = () => {
    const galleryImages = [
      { src: "/gori.webp", alt: "Gori", speed: 0.7 },
      { src: "/crow.webp", alt: "Crowley", speed: 0.9 },
      { src: "/crocs2.webp", alt: "Snap", speed: 1.1 },
      { src: "/foxy.webp", alt: "Foxy", speed: 0.8 },
      { src: "/snake.webp", alt: "Slither", speed: 1.2 },
      { src: "/bear.webp", alt: "Bruno", speed: 0.6 },
      { src: "/owl.webp", alt: "Hoot", speed: 1.0 },
      { src: "/crocs.webp", alt: "Chompy", speed: 0.85 },
      { src: "/tiger.webp", alt: "Rajah", speed: 1.15 },
      { src: "/bulldog.webp", alt: "Tank", speed: 0.9 },
      { src: "/redPanda.webp", alt: "Rusty", speed: 0.95 },
      { src: "/tiger2.webp", alt: "Blaze", speed: 1.0 },
      { src: "/gori.webp", alt: "Gori", speed: 0.75 },
      { src: "/crow.webp", alt: "Crowley", speed: 1.05 },
      { src: "/crocs2.webp", alt: "Snap", speed: 0.95 },
      { src: "/foxy.webp", alt: "Foxy", speed: 0.9 },
    ];
  return (
    <>
        <ScrollingGallery images={galleryImages} />
    </>
  )
}

export default ScrollingGalleryDemo