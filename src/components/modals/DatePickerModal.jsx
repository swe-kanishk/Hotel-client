import React from 'react'
import DateRangePicker from '../DateRangePicker'

export default function DatePickerModal({ isOpen, checkIn, checkOut }) {
  return (
    <div className={`border-1 border-gray-500 border  ${isOpen && 'hidden'} absolute shadow-reserve rounded-xl overflow-hidden flex items-center justify-center ml-3 flex-1 mt-[3.7rem]`}>
      <DateRangePicker setCheckIn={checkIn}  setCheckOut={checkOut} />
    </div>
  )
}
