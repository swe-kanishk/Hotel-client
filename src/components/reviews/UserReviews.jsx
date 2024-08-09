import React from "react";


import { HiPencil } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa";
import useReviewModal from "../../hooks/useReviewModal";
import ReviewsContainer from "./ReviewsContainer";

export default function UserReviews({ listingDetails }) {
  const reviewModal = useReviewModal();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-xl font-[500]">
          <FaRegCommentDots /> People's review
        </div>
        <button
          onClick={reviewModal.open}
          className="flex items-center gap-2 border-b border-1 bg-gray-100 border-none rounded-lg hover:bg-gray-200 py-2 px-3"
        >
          <HiPencil /> Add a review
        </button>
      </div>
      <ReviewsContainer ListingDetails={listingDetails} />
    </div>
  );
}
