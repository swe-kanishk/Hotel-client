import React, { useState } from "react";
import Logo from "./Logo.jsx";
import UserMenu from "./UserMenu.jsx";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";

export default function Navbar() {
  return (
    <div className="fixed bg-white top-0 left-0 right-0 z-10">
      <header className="py-4 md:px-8 px-4 flex items-center justify-between max-w-[1680px] mx-auto border-b-[1px]">
        <Link to="/" className="px-4  hidden md:flex">
          <Logo
            logo={
              "https://cdn.prod.website-files.com/6047a9e35e5dc54ac86ddd90/6387b574438cb3aac7fcf8c5_8QxOTbpyisEwldvyhwvfa_LhpqNLyGmJagh6i7fTgqg.png"
            }
          />
        </Link>
        <div className="hidden md:block"></div>
        <Search />
        <UserMenu />
      </header>
    </div>
  );
}