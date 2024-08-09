import React from 'react';
import { BiDollar } from 'react-icons/bi';

export default function Input({ id, label, errors, register, disabled, type, name, formatPrice }) {
  return (
    <div className='relative w-full'>
      {formatPrice && (
        <BiDollar
        size={22}
        className="text-neutral-700 absolute top-[1.65rem] left-0"
        />
      )}
      <input 
        id={id} 
        type={type}
        name={name}
        disabled={disabled} 
        {...register(id, { required: `${label} is required` })} 
        placeholder=' ' 
        className={`peer w-full px-6 pb-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
      />
      <label htmlFor={id} className={`absolute text-md left-6 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}>
        {label}
      </label>
      {errors[id] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
}
