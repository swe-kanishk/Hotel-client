import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import toast from "react-hot-toast";
import axios from "axios";
import Categories from "../components/Navbar/Categories";
import UserContext from "../UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();

  const fetchListings = async (category = null) => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/listings`;
      if (category) {
        url += `/search?category=${category}`;
      }
      const response = await axios.get(url);
      if (response) {
        setListings(response.data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Error fetching listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory) {
      fetchListings(activeCategory);
    } else {
      fetchListings();
    }
  }, [activeCategory]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const cardClickHandler = (listingId) => {
    try {
      navigate(`/listings/${listingId}`);
    } catch (error) {
      console.error("Error changing URL:", error);
      toast.error("Error changing URL");
    }
  };

  const resetFilters = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <Categories
        setListings={setListings}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      {!listings.length ? (
        <EmptyState showReset resetFilters={resetFilters} />
      ) : (
        <div className="pt-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              data={listing}
              cardClickHandler={() => cardClickHandler(listing._id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
