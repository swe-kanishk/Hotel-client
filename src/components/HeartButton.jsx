import React from 'react';

export default function HeartButton({ clickHandler, userfavorite, outline, text }) {
  let isFavorite = userfavorite;
  return (
      <div 
      className='relative hover:opacity-80 transition cursor-pointer' 
      onClick={() => clickHandler()}
    >
      {isFavorite ? (
        <>
        <i className={`fa-solid fa-heart text-rose-500 text-${text} absolute -top-[2px] -right-[0.8px]`}></i>
        <i className={`fa-regular fa-heart text-white text-${text} absolute -right-[0.8px] -top-[2.2px]`}></i>
        </>
      ) : (
        <>
        <i className={`fa-regular fa-heart text-neutral-500/70 text-${text} absolute -top-[2px] -right-[0.8px]`}></i>
        <i className={`fa-regular fa-heart text-${outline} text-${text} absolute -right-[0.8px] -top-[2.2px]`}></i>
        </>
      )}
    </div>
  );
}
