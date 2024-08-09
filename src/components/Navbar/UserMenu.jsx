import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import useRentModal from '../../hooks/useRentModal';
import { useUser } from '../../UserContext'; // Assuming you have setUser function in UserContext
import toast from 'react-hot-toast'; // Assuming you are using 'react-hot-toast' for notifications

export default function UserMenu() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser: setUserContext } = useUser(); // Assuming useUser provides setUser function

  const onRent = useCallback(() => {
    if(!user) {
       return loginModal.open()
    }
    rentModal.open()
  }, [user, loginModal, rentModal])

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  useEffect(() => {
    if (user) {
      setIsOpen(false); // Close the menu after successful login
    }
  }, [user]);


  const logout = () => {
    localStorage.removeItem('jwt');
    // Optionally clear other user-related data from localStorage
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`);
      logout()
      toast.success('Logged out successfully');
      console.log(response); // Optionally handle response data

      // Assuming you have a setUser function in your context to update the user state
      setUserContext(null); // Update user context to reflect logout
      setIsOpen(false); // Close menu after logout
    } catch (error) {
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1 relative">
      <div onClick={onRent} className="px-3 hover:bg-gray-100 py-3 rounded-full hidden lg:block">
        <span className="text-[15px]">Airbnb your home</span>
      </div>
      <a href="#" className="px-3 hover:bg-gray-100 py-3 rounded-full hidden lg:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </a>
      <div
        onClick={toggleMenu}
        className="flex border border-gray-300 gap-2 rounded-full py-2 px-3 items-center hover:shadow shadow-gray-900 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className="flex items-center border border-gray-300 rounded-full bg-gray-600 text-white overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative bottom-[-4px] left-0"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-auto bg-white z-10 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!!user ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentModal.open} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.open} label="Login" />
                <MenuItem onClick={registerModal.open} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
