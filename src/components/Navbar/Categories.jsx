import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { BiSliderAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiIsland,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiPawHeart,
  GiSunrise,
} from "react-icons/gi";
import { MdOutlineVilla, MdLocalFlorist, MdPets } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { GiCampingTent } from "react-icons/gi";
import { FaIgloo } from "react-icons/fa6";
import { IoIosBoat } from "react-icons/io";

import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description:
      "Properties near the beach, offering scenic views and relaxation.",
  },
  {
    label: "Mountain",
    icon: TbMountain,
    description:
      "Properties nestled in the mountains, perfect for hiking and breathtaking views.",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "Properties with pools, ideal for swimming and lounging.",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description:
      "Properties featuring traditional windmills, offering a unique cultural experience.",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description:
      "Properties with rustic barns, providing a charming countryside ambiance.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description:
      "Properties in desert landscapes, offering solitude and starry skies.",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "Properties on islands, surrounded by ocean and tranquility.",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description:
      "Properties resembling historic castles, providing a royal experience.",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description:
      "Properties in caves or cave-like structures, offering a unique and secluded retreat.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description:
      "Properties near ski resorts, perfect for winter sports enthusiasts.",
  },
  {
    label: "Forest",
    icon: GiForestCamp,
    description:
      "Properties surrounded by dense forests, ideal for nature lovers and hiking.",
  },
  {
    label: "Snow",
    icon: BsSnow,
    description:
      "Properties covered in snow, offering a serene winter wonderland experience.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description:
      "Contemporary properties with sleek designs and modern amenities.",
  },
  {
    label: "View",
    icon: GiSunrise,
    description:
      "Properties offering stunning views of the morning sunrise, ideal for a refreshing start to the day.",
  },
  {
    label: "Florist",
    icon: MdLocalFlorist,
    description:
      "Properties adorned with fresh flowers and floral arrangements, creating a vibrant and welcoming atmosphere.",
  },
  {
    label: "Premium",
    icon: IoDiamond,
    description:
      "Luxurious properties offering exclusive amenities and top-tier service.",
  },
  {
    label: "Historic",
    icon: GiCastle,
    description:
      "Historic properties with rich cultural heritage and architectural significance.",
  },
  {
    label: "Camping",
    icon: GiCampingTent,
    description:
      "Outdoor accommodations offering a nature-immersive experience with basic amenities and scenic surroundings.",
  },
  {
    label: "Arctic",
    icon: FaIgloo,
    description:
      "Unique accommodations crafted from ice and snow, offering a distinctive and cozy Arctic experience with stunning winter landscapes.",
  },
  {
    label: "Boat",
    icon: IoIosBoat,
    description:
      "Floating accommodations offering a unique stay experience on water, with scenic views and a tranquil environment.",
  },
];

export default function Categories({ activeCategory, setActiveCategory }) {
  const containerRef = useRef(null);

  const handleCategoryClick = async (category) => {
    console.log(category);
    setActiveCategory(category);
  };

  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <div className="relative flex items-center w-full justify-start pt-[85px] pb-1 gap-10 flex-1 px-8 shadow-gray-200 shadow-md overflow-hidden">
      <div
        ref={containerRef}
        className="pt-3 pb-1 transition-all duration-1000 flex flex-row items-center px-4 justify-start gap-10 overflow-x-scroll"
        style={{ transition: "transform 0.3s ease" }}
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
            onClick={() => handleCategoryClick(item.label)}
            selected={activeCategory === item.label}
          />
        ))}
      </div>
      <div className="flex gap-4 items-center min-w-fit">
        <div className="border-[1px] rounded-xl font-medium hover:border-black border-gray-200 text-sm p-3 flex items-center gap-2">
          <BiSliderAlt size={18} />
          Filters
        </div>
        <div className="border-[1px] rounded-xl min-w-fit text-sm font-medium hover:border-black border-gray-200 text-md p-3 flex items-center gap-2">
          Display total before taxes
          <div className="flex items-center justify-center space-x-2">
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="toggle"
                  type="checkbox"
                  className="hidden"
                  checked={checked}
                  onChange={toggleSwitch}
                />
                <div
                  className={`toggle__line w-10 h-[1.4rem] flex items-center px-1 relative rounded-full shadow-inner ${
                    checked ? "bg-black" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`toggle__dot relative w-4 h-4 bg-white flex items-center justify-center rounded-full shadow-md ${
                      checked ? "left-4 bg-white" : "left-0"
                    }`}
                  >
                    {checked ? <FaCheck size={12} /> : ""}
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
