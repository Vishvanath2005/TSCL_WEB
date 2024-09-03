import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
   
    navigate("/profile");
    setIsDropdownOpen(false); n
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('code');
    navigate('/');
    setIsDropdownOpen(false); 
  };

  return (
    <div className="flex justify-end bg-secondary p-3 ">
      <div className="flex gap-5 items-center pr-5">
        <IoIosNotifications className="text-2xl" />
        <div className="relative">
          <FaCircleUser
            className="text-3xl text-gray-400 cursor-pointer"
            onClick={handleToggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute -right-6 mt-2 w-28 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1 font-lexend">
                <li
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer border-b-2"
                  onClick={handleProfileClick}
                >
                  Profile
                </li>
                <li
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
