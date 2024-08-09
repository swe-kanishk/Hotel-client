import React from 'react'
import { FaStar } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

export default function ReviewsContainer({ListingDetails}) {
  return (
    <div className="grid grid-cols-3 justify-start items-center">
        <div className="flex flex-col gap-2 text-start justify-center items-start">
          <div className="flex gap-4 items-center">
            <div className="flex items-center border h-10 w-10 justify-center border-gray-300 rounded-full bg-gray-600 text-white overflow-hidden">
              {!ListingDetails.owner.avatar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 relative bottom-[-8px] left-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <img src={""} alt="" />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-medium relative top-[1px]">Amamn</div>
              <div className="text-xs text-gray-500">Joined 5 year ago</div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <div className="flex gap-[2px]">
                <FaStar size={10} />
                <FaStar size={10} />
                <FaStar size={10} />
                <FaStar size={10} />
                <FaStar size={10} />
              </div>
              <div>
                <BsDot />
              </div>
              <div className="text-xs font-medium">June 2024</div>
            </div>
            <div className="text-sm text-gray-600 flex-wrap">
              This is the best Airbnb i have ever taken. It's so clean, nice and
              well equipped with washing machine, and kitchen fully equipped.
              The Jacuzzi has great view. Thank you Vano for
            </div>
          </div>
        </div>
      </div>
  )
}
