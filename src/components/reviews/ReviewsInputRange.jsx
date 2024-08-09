import React, { useState } from "react";

export default function ReviewsInputRange({
  id,
  icon,
  min,
  max,
  onChange,
  defaultValue,
}) {
  const [ratingValue, setRatingValue] = useState(defaultValue);
  return (
    <div className="grid grid-cols-2">
      <label htmlFor={id} className="flex items-center gap-4 text-md">
        {icon}
        {id}
      </label>
      <div className="flex items-center gap-8">
        <input
          id={id}
          onChange={(e) => {
            onChange(e.target.value);
            setRatingValue(e.target.value);
          }}
          required
          type="range"
          min={min}
          max={max}
          className="flex-1"
          value={ratingValue}
        />
        <div>{ratingValue}</div>
      </div>
    </div>
  );
}
