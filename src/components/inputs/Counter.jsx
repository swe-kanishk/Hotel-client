import React, { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function Counter({ title, subtitle, value, onChange }) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return; // Prevent reducing value below 1
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-col'>
        <div className='font-medium'>{title}</div>
        <div className='font-light text-gray-600'>{subtitle}</div>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div
          onClick={onReduce}
          className='w-10 h-10 rounded-full flex border-neutral-400 border-[1px] items-center text-neutral-600 cursor-pointer justify-center hover:opacity-80 transition'
          role='button' // Accessibility enhancement
          tabIndex='0' // Ensure it's focusable
          aria-label='Reduce value'
        >
          <AiOutlineMinus />
        </div>
        <div className='font-light text-xl text-neutral-600'>{value}</div>
        <div
          onClick={onAdd}
          className='w-10 h-10 rounded-full flex border-neutral-400 border-[1px] items-center text-neutral-600 cursor-pointer justify-center hover:opacity-80 transition'
          role='button' // Accessibility enhancement
          tabIndex='0' // Ensure it's focusable
          aria-label='Increase value'
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
