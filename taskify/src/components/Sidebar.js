import React, { useState, useEffect } from "react";
import {
  FaTasks,
  FaUser,
  FaCog,
  FaBars,
  FaSignOutAlt,
  FaPalette,
  FaBell,
  FaUpload,
} from "react-icons/fa";

const Sidebar = ({ darkMode, setDarkMode, taskCount }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [profileImage, setProfileImage] = useState("");

  // Load saved profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    } else {
      setProfileImage("https://i.pravatar.cc/100?u=default");
    }
  }, []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-full bg-blue-900 p-4 text-white transition-all duration-300 relative`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-6 focus:outline-none"
      >
        <FaBars size={20} />
      </button>

      {/* Profile Section */}
      <div className="mb-6 text-center">
        <label htmlFor="profile-upload" className="cursor-pointer relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full mx-auto border-2 border-white shadow-lg"
          />
          <div className="absolute bottom-0 right-8 bg-white p-1 rounded-full shadow-md">
            <FaUpload className="text-blue-600" size={16} />
          </div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        {isOpen && <p className="mt-2 font-bold">Jagadeesh</p>}
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-4">
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
            activeTab === "Tasks"
              ? "bg-blue-500"
              : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("Tasks")}
        >
          <FaTasks className="mr-2" /> {isOpen && `Tasks (${taskCount})`}
        </li>
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
            activeTab === "Profile"
              ? "bg-blue-500"
              : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("Profile")}
        >
          <FaUser className="mr-2" /> {isOpen && "Profile"}
        </li>
        <li
          className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
            activeTab === "Settings"
              ? "bg-blue-500"
              : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("Settings")}
        >
          <FaCog className="mr-2" /> {isOpen && "Settings"}
        </li>
      </ul>

      {/* Theme Toggle & More Features */}
      <div className="absolute bottom-10 w-full px-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full bg-gray-700 text-white py-2 rounded-lg mb-3 hover:bg-gray-600 flex items-center justify-center"
        >
          <FaPalette className="mr-2" /> {isOpen && "Change Theme"}
        </button>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg mb-3 hover:bg-yellow-400 flex items-center justify-center">
          <FaBell className="mr-2" /> {isOpen && "Notifications"}
        </button>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> {isOpen && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
