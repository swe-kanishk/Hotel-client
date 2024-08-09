import React from "react";
import { LuDot } from "react-icons/lu";

export default function ListingInfo({ details }) {
  return (
    <div className="pb-6 w-[60%] h-72">
      <h1 className="text-3xl">{details.location}</h1>
      <div className="flex items-center font-light">
        <span>{details.guestCount} guests</span>
        <LuDot />
        <span>{details.roomCount} rooms</span>
      </div>
      <div className="mt-4">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border h-12 w-12 justify-center border-gray-300 rounded-full bg-gray-600 text-white overflow-hidden">
              {!details.owner.avatar ? (
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
                <img src={details.owner.avatar.url} alt="" />
              )}
            </div>
            <div>Hosted by {details.owner.fullName}</div>
          </div>
          <div className="mt-6">{details.description}</div>
        </div>
      </div>
    </div>
  );
}
