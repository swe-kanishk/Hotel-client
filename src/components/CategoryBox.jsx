import React from 'react';

export default function CategoryBox({ icon: Icon, label, selected, onClick }) {

  return (
    <div 
      onClick={onClick} 
      className={`flex flex-col items-center justify-center gap-1 border-b-2 transition cursor-pointer ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-gray-500'} hover:border-gray-600 hover:text-neutral-800`}
    >
      <Icon size={26} />
      <div className='font-medium text-xs'>{label}</div>
    </div>
  )
}
