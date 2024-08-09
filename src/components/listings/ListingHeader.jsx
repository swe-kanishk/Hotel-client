import React from "react";
import { LuShare } from "react-icons/lu";
import HeartButton from "../HeartButton";

export default function ListingHeader({ title, isFavorite, onHeartClick }) {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="px-3 py-2 flex gap-3 hover:bg-gray-100 items-center rounded-md">
          <LuShare />
          <div className="underline underline-offset-2">share</div>
        </div>
        <div className="px-3 py-2 flex gap-1 hover:bg-gray-100 justify-end w-[90px] rounded-md relative">
          <HeartButton
            userfavorite={isFavorite}
            clickHandler={onHeartClick}
            outline="black"
            text="lg"
          />
          <div className="underline underline-offset-2">
            {isFavorite ? "unsave" : "save"}
          </div>
        </div>
      </div>
    </div>
  );
}
