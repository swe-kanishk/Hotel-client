import React, { useState, useEffect } from "react";
import { HiStar } from "react-icons/hi";
import HeartButton from "../HeartButton";
import { useUser } from "../../UserContext";
import useLoginModal from "../../hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

export default function ListingCard({ data, cardClickHandler }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(null); // Initially assume it's not a favorite
  const { user } = useUser();

  const loginModal = useLoginModal();

  useEffect(() => {
    if (user) {
      checkIsFavorite();
    }
  }, [user, data._id, setFavorites]); // Include data._id to trigger when listing changes

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  const checkIsFavorite = async () => {
    if (!user || !data._id) {
      setIsFavorite(false); // Set default value if user or data._id is not available
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No JWT token found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/favorites/check/${data._id}`,
        {
          userId: user.id,
          listingId: data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsFavorite(response.data.isFav); // Assuming response.data contains the correct structure
    } catch (error) {
      console.error("Error checking listing favorite status:", error);
      // Handle error state as needed
    }
  };

  const handleHeartClick = async () => {
    if (!user) {
      loginModal.open();
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      loginModal.open()
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/favorites`,
        {
          userId: user.id,
          listingId: data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsFavorite(res.data.user.favorites.includes(data._id));
      setFavorites(res.data.user.favorites);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error adding listing to favorites:", error);
      toast.error("Error adding to favorites");
    }
  };

  return (
    <div className="card-wrapper">
      <div className="card-container">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <div
              className="slider"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {data.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Listing image ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-[105%] transition-all"
                  onClick={() => cardClickHandler(data._id)}
                />
              ))}
            </div>
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="slider-button absolute top-1/2 left-2 transition transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
            )}
            {currentImageIndex < data.images.length - 1 && (
              <button
                onClick={nextImage}
                className="slider-button absolute top-1/2 right-2 transition transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            )}
            <div className="flex justify-center mt-2 absolute bottom-2 w-full">
              {data.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    currentImageIndex === index ? "active-dot" : "inactive-dot"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
            <div className="absolute top-3 right-3">
              <HeartButton
                clickHandler={handleHeartClick}
                userfavorite={isFavorite}
                outline="white"
                text="xl"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mr-2 mt-1">
          <div className="font-medium text-md">{data.location}</div>
          <div className="flex items-center gap-1">
            <HiStar /> 4.8
          </div>
        </div>
        <div className="font-normal text-neutral-500 text-sm">{data.title}</div>
        <div className="font-normal text-neutral-500 text-sm">
          {data.category}
        </div>
        <div className="flex gap-1 text-medium font-light">
          <div className="font-normal text-md">$ {data.price}</div>
          per night
        </div>
      </div>
    </div>
  );
}
