import ScrollingGallery from '@/ui/components/gallery/ScrollingGallery';
import React from 'react'

const ScrollingGalleryDemo = () => {
    const galleryImages = [
      {
        src: "/emily0.png",
        alt: "Emily",
        speed: 0.7
      },
      {
        src: "/roiin0.png", 
        alt: "Roiin",
        speed: 0.9
      },
      {
        src: "/daisy0.png",
        alt: "Daisy",
        speed: 1.1
      },
      {
        src: "/lance0.png",
        alt: "Lance",
        speed: 0.8
      },
      {
        src: "/renei0.png",
        alt: "Renei",
        speed: 1.2
      },
      {
        src: "/linda0.png",
        alt: "Linda",
        speed: 0.6
      },
      {
        src: "/emily0.png",
        alt: "Emily",
        speed: 1.0
      },
      {
        src: "/roiin0.png",
        alt: "Roiin", 
        speed: 0.85
      },
      {
        src: "/daisy0.png",
        alt: "Daisy",
        speed: 1.15
      },
      {
        src: "/lance0.png",
        alt: "Lance",
        speed: 0.75
      },
      {
        src: "/renei0.png",
        alt: "Renei",
        speed: 1.05
      },
      {
        src: "/linda0.png",
        alt: "Linda",
        speed: 0.95
      },
      {
        src: "/emily0.png",
        alt: "Emily",
        speed: 0.9
      },
      ];
  return (
    <>
        <ScrollingGallery images={galleryImages} />
    </>
  )
}

export default ScrollingGalleryDemo