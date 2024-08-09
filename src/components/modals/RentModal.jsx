import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import Modal from "./Modal";
import useRentModal from "../../hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

const Steps = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

// Lazy load the Map component
const Map = lazy(() => import("../Map"));

axios.defaults.withCredentials = true; // Ensure credentials are included with requests

export default function RentModal() {
  const rentModal = useRentModal();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      price: 1,
      title: "",
      description: "",
      bathroomCount: 1,
      images: [],
    },
  });

  const [step, setStep] = useState(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const images = watch("images");

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (step === Steps.PRICE) {
      handleSubmit(onSubmit)();
    } else {
      setStep((value) => value + 1);
    }
  };

  const actionLabel = useMemo(() => {
    return step === Steps.PRICE ? "Create" : "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === Steps.CATEGORY ? undefined : "Back";
  }, [step]);

  const handleLocationChange = useCallback((selectedCountry) => {
    setCustomValue("location", selectedCountry); // Assuming selectedCountry has latlng property
  }, []);

  const handleImageChange = useCallback((selectedImages) => {
    setCustomValue("images", selectedImages);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem("jwt");
        const formData = new FormData();

        // Append JSON data
        Object.keys(data).forEach(key => {
            if (key === 'location') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });

        // Append files
        images.forEach((file, index) => {
            formData.append('images', file); // Use 'images' as the field name
        });
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/listings`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        toast.success("Listing created successfully!");
        rentModal.close();
    } catch (error) {
        console.error("There was an error creating the listing:", error);
        toast.error("Failed to create the listing.");
    } finally {
        setIsLoading(false);
    }
};



  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => setCustomValue("category", item.label)}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect value={location} onChange={handleLocationChange} />
        <Suspense fallback={<div>Loading map...</div>}>
          <Map center={location?.latlng} />{" "}
          {/* Update center prop dynamically */}
        </Suspense>
      </div>
    );
  }

  if (step === Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many Rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    );
  }

  if (step === Steps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add some images of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload value={images} onChange={handleImageChange} />
      </div>
    );
  }

  if (step === Steps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subtitle="short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === Steps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice={true}
          type="Number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.close}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
}
