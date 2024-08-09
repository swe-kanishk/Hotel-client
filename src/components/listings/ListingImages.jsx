import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import useImageGalleryModal from "../../hooks/useImageGalleryModal";
import ImagesModal from "../../components/modals/ImagesModal"; // Use PascalCase for component names

export default function ListingImages({ images, onGalleryOpen }) {
  const imageGalleryModal = useImageGalleryModal();

  return (
    <div className="mt-6">
      <div className="flex w-[100%] gap-4 relative">
        <div className="h-[660px] flex-auto flex object-cover overflow-hidden">
          <img
            src={images[0].url}
            className="flex-1 flex object-cover cursor-pointer hover:brightness-75 rounded-xl aspect-square"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex gap-4">
            {images.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt=""
                className="aspect-square cursor-pointer hover:brightness-75 rounded-xl h-80 flex-1 object-cover"
              />
            ))}
          </div>
          <div className="flex gap-4">
            {images.slice(3, 5).map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt=""
                className="aspect-square cursor-pointer hover:brightness-75 rounded-xl h-80 flex-1 object-cover"
              />
            ))}
          </div>
        </div>
        <button
          onClick={imageGalleryModal.open}
          className="flex absolute bottom-4 right-3 items-center justify-center gap-2 rounded-xl px-3 py-2 border border-black bg-white"
        >
          <CgMenuGridO size={22} /> show all photos
        </button>
      </div>
      <ImagesModal
        isOpen={imageGalleryModal.isOpen}
        onClose={imageGalleryModal.close}
        images={images}
      />
    </div>
  );
}
