import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../UserContext";
import useLoginModal from "../hooks/useLoginModal";
import ListingHeader from "../components/listings/ListingHeader";
import ListingImages from "../components/listings/ListingImages";
import ListingInfo from "../components/listings/ListingInfo";
import ReserveCard from "../components/reserve/ReserveCard";
import ReviewModal from "../components/modals/ReviewsModal";
import ReviewsRatingContainer from "../components/reviews/ReviewsRatingContainer";
import UserReviews from "../components/reviews/UserReviews";
import OwnerCard from "../components/OwnerCard";
import Amenties from "../components/Amenties";

export default function ListingDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
  const loginModal = useLoginModal();

  const [listingDetails, setListingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings/details/${id}`);
        setListingDetails(data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        toast.error("Error fetching listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  useEffect(() => {
    favoritesHandler()
  }, [user, id]);

  const favoritesHandler = async () => {
    if (user) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error('No JWT token found in localStorage');
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/favorites/check/${id}`,
        {
          userId: user.id,
          listingId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setIsFavorite(data.isFav);
    } catch (error) {
      console.error('Error adding listing to favorites:', error);
    }
  }
  }

  const handleHeartClick = async () => {
    if (!user) {
      loginModal.open();
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error('No JWT token found in localStorage');
      toast.error('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/favorites`,
        {
          userId: user.id,
          listingId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setFavorites(data.user.favorites);
      setIsFavorite(data.user.favorites.includes(id));
      toast.success(data.message);
    } catch (error) {
      console.error('Error adding listing to favorites:', error);
      toast.error('Error adding to favorites');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listingDetails) {
    return <div>No listing data found</div>;
  }

  return (
    <div className="max-w-[98vw] overflow-hidden px-4 pt-[100px] mx-auto">
      <ListingHeader
        title={listingDetails.title}
        id={id}
        user={user}
        favorites={favorites}
        isFavorite={isFavorite}
        onHeartClick={handleHeartClick}
      />
      <ListingImages images={listingDetails.images} />
      <div className="flex mt-6 justify-between">
        <ListingInfo details={listingDetails} />
        <ReserveCard
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onCheckInDateChange={setCheckInDate}
          onCheckOutDateChange={setCheckOutDate}
        />
      </div>
      <Amenties />
      <ReviewModal listingId={id} userId={user ? user._id : null} />
      <hr />
      <ReviewsRatingContainer reviewIcons={['Cleanliness', 'Accuracy', 'Check-in', 'Communication', 'Location', 'Value']} />
      <hr />
      <div className="mt-8 mb-8">
        <UserReviews listingDetails={listingDetails} />
      </div>
      <div className="mt-8">
        <OwnerCard />
      </div>
      <hr />
    </div>
  );
}
