import React from 'react';
import { GiFlowerPot } from "react-icons/gi";
import { GiPillow } from "react-icons/gi";
import { MdCleanHands } from "react-icons/md";
import { TbFridge } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { PiSecurityCameraDuotone } from "react-icons/pi";
import { GiTable } from "react-icons/gi";
import { GiLift } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { FaBath } from "react-icons/fa";

export default function Amenties() {
  return (
    <div className='flex flex-col gap-6 mb-8 w-2/5'>
        <div className='text-xl font-medium'>what this place offers</div>
        <div className='rounded-xl text-gray-500 text-lg flex justify-center shadow-reserve px-8 py-6'>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-tv"></i>
          </div>
          <span>TV</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-wifi"></i>
          </div>
          <span>Wifi</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-car"></i>
          </div>
          <span>Parking</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <GiFlowerPot size={24} />
          </div>
          <span>Garden view</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <MdOutlinePets size={24} />
          </div>
          <span>Pets allowed</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <PiSecurityCameraDuotone size={24} />
          </div>
          <span>Security cameras</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-water-ladder"></i>
          </div>
          <span>Pool</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-smoking"></i>
          </div>
          <span>Smoking allowed</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <GiTable size={24} />
          </div>
          <span>Dining table</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <TbFridge size={24} />
          </div>
          <span>Fridge</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-fire-extinguisher"></i>
          </div>
          <span>Fire extinguisher</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <i className="fa-solid fa-kit-medical"></i>
          </div>
          <span>First aid kit</span>
        </div>
        
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <GiWashingMachine size={24} />
          </div>
          <span>Washing machine</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <GiLift size={24} />
          </div>
          <span>Lift</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <MdCleanHands size={24} />
          </div>
          <span>Cleaning products</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <FaBath size={24} />
          </div>
          <span>Bath</span>
        </div>
        <div className="items justify-start flex items-center gap-4">
          <div className="items-icon w-8">
            <GiPillow size={24} />
          </div>
          <span>Extra pillows and blankets</span>
        </div>
      </div>
    </div>
    </div>
  );
}
