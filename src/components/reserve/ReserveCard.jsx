import React, { useState, useEffect } from "react";
import DatePickerModal from "../modals/DatePickerModal";
import { FaAngleDown } from "react-icons/fa";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ReserveCard({ checkInDate, checkOutDate, onCheckInDateChange, onCheckOutDateChange }) {
  const [dateRangeOpen, setDateRangeOpen] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 767 && window.scrollY < 1388) {
        setIsFixed(true);
        setAddNew(false)
      } else if (window.scrollY >= 1310) {
        setIsFixed(false);
        setAddNew(true)
      }
      else {
        setIsFixed(false);
        setAddNew(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return  (
    <div className="relative flex-1 flex flex-col">
      <div className={`mt-4 pb-6 w-full flex items-center ${addNew ? 'absolute top-[620px] right-0' : ''}  justify-end ${isFixed ? 'fixed top-20 right-[33px]' : ''}`} id="reserve-card">
      <div className="w-50">
        <div className="flex flex-col gap-4 px-8 py-4 border-1 flex-1 shadow-reserve bg-white border-gray-500 border rounded-2xl relative">
          <h1 className="text-xl font-light">Add dates for prices</h1>
          <div className="flex border-1 border border-gray-500 rounded-lg overflow-hidden">
            <div className="flex flex-col w-full text-sm">
              <div
                className="grid grid-cols-2 border-b border-1 border-gray-500 cursor-pointer"
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
              >
                <div className="border-1 border-r flex flex-col border-gray-500 px-3 py-2 cursor-pointer">
                  <label htmlFor="checkIn" className="font-medium cursor-pointer">
                    check-in
                  </label>
                  <input
                    type="text"
                    className="outline-none cursor-pointer text-gray-500"
                    placeholder="Add date"
                    readOnly
                    value={formatDate(checkInDate)}
                  />
                </div>
                <div className="px-3 py-2 flex flex-col gap-1 cursor-pointer">
                  <label htmlFor="checkOut" className="font-medium cursor-pointer">
                    check-out
                  </label>
                  <input
                    type="text"
                    className="outline-none cursor-pointer text-gray-500"
                    placeholder="Add date"
                    readOnly
                    value={formatDate(checkOutDate)}
                  />
                </div>
              </div>
              <DatePickerModal
                isOpen={dateRangeOpen}
                checkIn={onCheckInDateChange}
                checkOut={onCheckOutDateChange}
              />
              <div className="px-3 py-2 flex justify-between items-center font-medium">
                <div className="flex flex-col font-medium">
                  <label htmlFor="guests">Guests</label>
                  <input
                    type="text"
                    className="outline-none cursor-pointer"
                    placeholder="1 guest"
                  />
                </div>
                <div className="cursor-pointer">
                  <FaAngleDown />
                </div>
              </div>
            </div>
          </div>
          <button className="bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-lg">
            check availability
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
