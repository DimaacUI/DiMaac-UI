import ImageGallery from "@/ui/components/gallery/ImageGallery";

const ImageGalleryDemo = () => {
  const galleryImages = [
    {
      src: "/emily.png",
      alt: "Emily"
    },
    {
      src: "/lance0.png",
      alt: "Lance"
    },
    {
      src: "/renei0.png",
      alt: "Renei"
    },
    {
      src: "/roiin0.png",
      alt: "Roiin"
    },
    {
      src: "/daisy0.png",
      alt: "Daisy"
    },
    {
      src: "/lylia0.png",
      alt: "Lylia"
    }
  ];

  return (
    <div className="min-h-screen h-[700px] flex justify-center items-center w-full rounded-lg overflow-hidden">
        <ImageGallery images={galleryImages} />
    </div>
  );
};

export { ImageGalleryDemo };
