// Layout.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import RentModal from "./components/modals/RentModal.jsx";
import RegisterModal from "./components/modals/RegisterModal.jsx";
import LoginModal from "./components/modals/LoginModal.jsx";
import SearchModal from "./components/modals/SearchModal.jsx";
import ToasterProvider from "./providers/ToasterProvider.jsx";
import ClientOnly from "./components/ClientOnly.jsx";

export default function Layout({ children }) {
  
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
      </ClientOnly>
    </>
  );
}
