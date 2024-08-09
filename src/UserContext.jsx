import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from './utils/auth';
import useLoginModal from './hooks/useLoginModal';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const loginModal = useLoginModal()

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        const verifyUser = async () => {
          const userData = await verifyToken(token);
          if (userData) {
            setUser(userData);
          } else {
            localStorage.removeItem('token');
            setTimeout(() => {
              loginModal.open()
            }, 2000)
          }
        };
        verifyUser();
      }
    }, []);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
};

export default UserContext;