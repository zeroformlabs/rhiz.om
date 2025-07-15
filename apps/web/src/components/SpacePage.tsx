"use client";

import { useSession } from "next-auth/react";
import { FaBars, FaComment, FaVideoSlash, FaMicrophoneSlash } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";

export function SpacePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Loading or not authenticated...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-cover bg-center"
         style={{ backgroundImage: "url('/background-placeholder.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Main Content Area */}
      <main className="z-10 flex-grow flex">
        {/* Chat Panel */}
        <div className="flex-1 bg-transparent p-4">
          <h2 className="text-white text-xl mb-4">Chat Panel</h2>
          {/* Chat content will go here */}
          <p className="text-white">Chat messages and input area.</p>
        </div>

        {/* VC Panel */}
        <div className="flex-1 bg-transparent p-4">
          <h2 className="text-white text-xl mb-4">VC Panel</h2>
          {/* Video conferencing content will go here */}
          <p className="text-white">Video streams and participant avatars.</p>
        </div>
      </main>

      

      

      {/* Bottom Navbar */}
      <nav className="z-10 p-4 bg-black bg-opacity-50 text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><FaBars /></button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><FaComment /></button>
        </div>
        <span className="text-xl font-semibold">Current Space Name</span>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><FaVideoSlash /></button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><FaMicrophoneSlash /></button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><FaCog /></button>
        </div>
      </nav>
    </div>
  );
}
