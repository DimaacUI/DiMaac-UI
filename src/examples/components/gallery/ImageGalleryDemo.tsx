import ImageGallery from "@/ui/components/gallery/ImageGallery";

const ImageGalleryDemo = () => {
  const galleryImages = [
    { src: "/gori.png", alt: "Gori" },
    { src: "/crocs2.png", alt: "Snap" },
    { src: "/crow.png", alt: "Crowley" },
    { src: "/foxy.png", alt: "Foxy" },
    { src: "/bear.png", alt: "Bruno" },
    { src: "/bulldog.png", alt: "Tank" },
    { src: "/redPanda.png", alt: "Rusty" },
    { src: "/tiger2.png", alt: "Blaze" },
  ];

  return (
    <div className="min-h-screen h-[700px] flex justify-center items-center w-full rounded-lg overflow-hidden">
        <ImageGallery images={galleryImages} />
    </div>
  );
};

export { ImageGalleryDemo };
