import React from 'react'

export default function Logo({logo}) {
  return (
    <img className='h-[45px] scale-[2] object-cover overflow-hidden' src={logo} alt="logo" />
  )
}
