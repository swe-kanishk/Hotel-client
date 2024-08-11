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

export default function SearchModal({ isOpen, onClose, getFromChild }) {
  const searchModal = useSearchModal();

  const [location, setLocationState] = useState('');
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
        if (typeof getFromChild === 'function') {
            getFromChild(location, guestCount);
        } else {
            console.error("getFromChild is not a function or is undefined", getFromChild);
        }
        searchModal.close();
    } else {
        onNext();
    }
}, [step, location, guestCount, getFromChild, searchModal]);

  const actionLabel = step === STEPS.DATE ? "Search" : "Next";
  const secondaryActionLabel = step === STEPS.LOCATION ? undefined : "Back";

  let bodyContent;
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where do you want to go?" subtitle="Select a location" />
        <CountrySelect value={location} onChange={setLocationState} />
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
          <DateRangePicker setCheckIn={setCheckIn} setCheckOut={setCheckOut} />
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryAction={secondaryActionLabel ? onBack : undefined}
      secondaryActionLabel={secondaryActionLabel}
      title="Filters"
      body={bodyContent}
    />
  );
}
