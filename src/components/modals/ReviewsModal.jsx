import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import useReviewModal from '../../hooks/useReviewModal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import ReviewsInputRange from '../reviews/ReviewsInputRange';
import { GoKey } from "react-icons/go";
import { FaPumpSoap } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from 'axios';
import useLoginModal from '../../hooks/useLoginModal';

const Steps = {
  RATING: 0,
  DETAILS: 1,
};

axios.defaults.withCredentials = true;

export default function ReviewModal({ listingId, userId }) {  

  const reviewModal = useReviewModal();
  const loginModal = useLoginModal();

  const [cleanliness, setCleanliness] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [location, setLocation] = useState(0);
  const [value, setValue] = useState(0);
  const [overallRating, setOverallRating] = useState(0);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      review: '',
    },
  });

  const [step, setStep] = useState(Steps.RATING);
  const [isLoading, setIsLoading] = useState(false);

  const review = watch('review');

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => (step === Steps.DETAILS ? handleSubmit(onSubmit)() : setStep((value) => value + 1));

  const actionLabel = useMemo(() => (step === Steps.DETAILS ? 'Submit' : 'Next'), [step]);
  const secondaryActionLabel = useMemo(() => (step === Steps.RATING ? undefined : 'Back'), [step]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if(userId) {
      try {
        const token = localStorage.getItem("jwt");
        const formData = new FormData();

        // Append JSON data
        formData.append('listingId', listingId);
        formData.append('userId', userId);
        formData.append('cleanliness', cleanliness);
        formData.append('accuracy', accuracy);
        formData.append('checkIn', checkIn);
        formData.append('communication', communication);
        formData.append('location', location);
        formData.append('value', value);
        formData.append('overallRating', overallRating);
        formData.append('review', data.review);

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/reviews`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );

        toast.success('Review submitted successfully!');
        reviewModal.close();
        reset();
    } catch (error) {
        console.error('Error submitting review:', error);
        toast.error('Failed to submit review.');
    } finally {
        setIsLoading(false);
    }
    }
    else {
      reviewModal.close();
      loginModal.open()
    }
};


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Rate your stay" subtitle="Give a rating out of 5" />
      <ReviewsInputRange id="Cleanliness" icon={<FaPumpSoap />} min={1} max={5} defaultValue={3} onChange={setCleanliness} />
      <ReviewsInputRange id="Accuracy" icon={<GoKey />} min={1} max={5} defaultValue={3} onChange={setAccuracy} />
      <ReviewsInputRange id="Check-In" icon={<IoCheckmarkCircleOutline />} min={1} max={5} defaultValue={3} onChange={setCheckIn} />
      <ReviewsInputRange id="Communication" icon={<FaRegCommentAlt />} min={1} max={5} defaultValue={3} onChange={setCommunication} />
      <ReviewsInputRange id="Location" icon={<FaMapMarkedAlt />} min={1} max={5} defaultValue={3} onChange={setLocation} />
      <ReviewsInputRange id="Value" icon={<GoTag />} min={1} max={5} defaultValue={3} onChange={setValue} />
    </div>
  );

  if (step === Steps.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Leave a Review" subtitle="Share your experience with others!" />
        <ReviewsInputRange id="overallRating" min={1} max={5} defaultValue={3} onChange={setOverallRating} />
        <Input
          id="review"
          label="Review"
          type="text"
          value={review}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={reviewModal.isOpen}
      onClose={reviewModal.close}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.RATING ? undefined : onBack}
      title="Leave a Review"
      body={bodyContent}
      disabled={isLoading}
    />
  );
}
