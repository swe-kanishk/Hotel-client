import React from 'react';
import { FaArrowLeft } from "react-icons/fa";


export default function ImagesModal({ images, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 top-0 bottom-0 bg-white left-0 right-0 z-50 flex items-center justify-center">
      <div className="relative w-full mx-auto p-4 bg-white rounded-lg">
      <button onClick={onClose} className='flex bg-white absolute gap-2 py-2 left-5 px-3 items-center justify-center border border-1 rounded-xl border-black'><FaArrowLeft /> back</button>
        <div className="flex flex-col items-center py-6 h-full overflow-y-scroll">
        <div className="h-[90vh] flex gap-4 flex-col items-center rounded-xl overflow-y-auto">
            {images.map((image, index) => (
              <img key={index} src={image.url} alt="" className="w-full hover:brightness-75 aspect-square rounded-lg object-cover" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
