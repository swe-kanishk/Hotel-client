import React from "react";
import { GoKey } from "react-icons/go";
import { FaPumpSoap } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function ReviewsRatingContainer({ reviewIcons }) {
  // Create an object mapping icon names to their respective icons
  const iconMap = {
    "Check-in": <GoKey />,
    Cleanliness: <FaPumpSoap />,
    Communication: <FaRegCommentAlt />,
    Value: <GoTag />,
    Location: <FaMapMarkedAlt />,
    Accuracy: <IoCheckmarkCircleOutline />,
  };

  return (
    <div className="py-6">
      <div className="flex justify-evenly h-[140px] py-2 px-3 rounded-lg w-full">
        <div className="flex items-center justify-start w-full mx-auto">
          <div className="flex flex-col items-start gap-1 flex-1 text-sm mx-auto">
            <label htmlFor="">Cleanliness</label>
            <label htmlFor="">Accuracy</label>
            <label htmlFor="">Check-in</label>
            <label htmlFor="">Communication</label>
            <label htmlFor="">Location</label>
            <label htmlFor="">Value</label>
          </div>
          <div className="flex flex-col gap-5 justify-center flex-1 h-full pr-12">
            <input type="range" disabled />
            <input type="range" disabled />
            <input type="range" disabled />
            <input type="range" disabled />
            <input type="range" disabled />
            <input type="range" disabled />
          </div>
          {/* </div> */}
          {reviewIcons.map((iconName, index) => (
            <div
              key={index}
              className="flex flex-col justify-between flex-1 items-start border-l h-full border-1 pl-[2rem] border-gray-200"
            >
              <div className="flex flex-col">
                <div className="font-medium text-md">{iconName} </div>
                <div>4.0</div>
              </div>
              <div className="text-4xl text-gray-500">{iconMap[iconName]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
