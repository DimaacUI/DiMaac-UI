import ScrollingGallery from '@/ui/components/gallery/ScrollingGallery';
import React from 'react'

const ScrollingGalleryDemo = () => {
    const galleryImages = [
      { src: "/gori.png", alt: "Gori", speed: 0.7 },
      { src: "/crow.png", alt: "Crowley", speed: 0.9 },
      { src: "/crocs2.png", alt: "Snap", speed: 1.1 },
      { src: "/foxy.png", alt: "Foxy", speed: 0.8 },
      { src: "/snake.png", alt: "Slither", speed: 1.2 },
      { src: "/bear.png", alt: "Bruno", speed: 0.6 },
      { src: "/owl.png", alt: "Hoot", speed: 1.0 },
      { src: "/crocs.png", alt: "Chompy", speed: 0.85 },
      { src: "/tiger.png", alt: "Rajah", speed: 1.15 },
      { src: "/bulldog.png", alt: "Tank", speed: 0.9 },
      { src: "/redPanda.png", alt: "Rusty", speed: 0.95 },
      { src: "/tiger2.png", alt: "Blaze", speed: 1.0 },
      { src: "/gori.png", alt: "Gori", speed: 0.75 },
      { src: "/crow.png", alt: "Crowley", speed: 1.05 },
      { src: "/crocs2.png", alt: "Snap", speed: 0.95 },
      { src: "/foxy.png", alt: "Foxy", speed: 0.9 },
    ];
  return (
    <>
        <ScrollingGallery images={galleryImages} />
    </>
  )
}

export default ScrollingGalleryDemo