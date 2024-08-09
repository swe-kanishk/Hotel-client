import React, { useCallback, useState, lazy, Suspense } from "react";
import useSearchModal from "../../hooks/useSearchModal";
import Modal from "./Modal";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import DateRangePicker from "../DateRangePicker";

const STEPS = {
  LOCATION: 0,
  INFO: 1,
  DATE: 2,
};

const Map = lazy(() => import("../Map"));

export default function SearchModal() {
  const searchModal = useSearchModal();

  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step === STEPS.DATE) {
      // Add your submit logic here
      console.log("Submit search with data:", {
        location,
        guestCount,
        roomCount,
        bathroomCount,
        checkIn, checkOut,
      });
    } else {
      onNext();
    }
  }, [step, location, guestCount, roomCount, bathroomCount, checkIn, checkOut, onNext]);

  const actionLabel = step === STEPS.DATE ? "Search" : "Next";
  const secondaryActionLabel = step === STEPS.LOCATION ? undefined : "Back";

  let bodyContent;
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where do you want to go?" subtitle="Select a location" />
        <CountrySelect value={location} onChange={setLocation} />
        <Suspense fallback={<div>Loading map...</div>}>
          <Map center={location?.latlng} />
        </Suspense>
      </div>
    );
  } else if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Specify details" />
        <hr />
        <Counter title="Guests" value={guestCount} onChange={setGuestCount} />
        <hr />
        <Counter title="Rooms" value={roomCount} onChange={setRoomCount} />
        <hr />
        <Counter title="Bathrooms" value={bathroomCount} onChange={setBathroomCount} />
        <hr />
      </div>
    );
  } else {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
        <div className="max-w-min border-1 border-black rounded-xl overflow-hidden min-w-full bg-red-500 border">
          <DateRangePicker setCheckIn={setCheckIn}  setCheckOut={setCheckOut}       />
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.close}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Filters"
      body={bodyContent}
    />
  );
}
