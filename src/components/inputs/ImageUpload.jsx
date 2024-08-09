import React, { useRef, useState } from 'react';

const ImageUpload = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to maximum 8 photos
    const selected = files.slice(0, 8 - selectedFiles.length);
    setSelectedFiles([...selectedFiles, ...selected]);

    // Pass selected files to parent component
    onChange([...selectedFiles, ...selected]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removePhoto = (link) => {
    setAddedPhotos(addedPhotos.filter(photo => photo !== link));
  };

  const selectAsMainPhoto = (link) => {
    if (addedPhotos.length > 1) {
      setAddedPhotos([link, ...addedPhotos.filter(photo => photo !== link)]);
    }
  };

  return (
    <>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
          <div key={`file-${index}`} className="h-32 flex relative">
            <img className="rounded-2xl w-full object-cover" src={URL.createObjectURL(file)} alt={`Selected Photo ${index}`} />
          </div>
        ))}
        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
          <div key={`photo-${index}`} className="h-32 flex relative">
            <img className="rounded-2xl w-full object-cover" src={link} alt={`Added Photo ${index}`} />
            <button onClick={() => removePhoto(link)} aria-label="Remove photo" className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button onClick={() => selectAsMainPhoto(link)} aria-label="Set as main photo" className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
              {link === addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              )}
              {link !== addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        className="border-dashed w-full relative cursor-pointer transition border-2 p-20 flex flex-col justify-center items-center gap-4 text-neutral-600 hover:opacity-70 border-neutral-300"
        onClick={handleClick}
      >
        <div className='font-semibold text-lg'>Click to upload</div>
      </div>
    </>
  );
}

export default ImageUpload;
