"use client";

import { useSession, signOut } from "next-auth/react";

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
         style={{ backgroundImage: "url('/space-background-placeholder.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Top Bar - Placeholder */}
      <header className="z-10 p-4 bg-black bg-opacity-50 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rhiz.om Space</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {session.user?.name || "User"}!</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main Content Area - Placeholder */}
      <main className="z-10 flex-grow flex p-4">
        <div className="flex-1 bg-white bg-opacity-20 rounded-lg p-4 mr-2">
          <h2 className="text-white text-xl mb-4">Chat Panel</h2>
          {/* Chat content will go here */}
          <p className="text-white">Chat messages and input area.</p>
        </div>
        <div className="flex-1 bg-white bg-opacity-20 rounded-lg p-4 ml-2">
          <h2 className="text-white text-xl mb-4">VC Panel</h2>
          {/* Video conferencing content will go here */}
          <p className="text-white">Video streams and participant avatars.</p>
        </div>
      </main>

      {/* Bottom Navbar - Placeholder */}
      <nav className="z-10 p-4 bg-black bg-opacity-50 text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">☰</button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">VC/Chat Toggle</button>
        </div>
        <span className="text-xl font-semibold">Current Space Name</span>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">🎥</button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">🎙</button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">⚙</button>
        </div>
      </nav>
    </div>
  );
}
