"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/background-placeholder.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 text-center text-white p-8 rounded-lg bg-black bg-opacity-30">
        <h1 className="text-4xl font-bold mb-4">Welcome to Rhiz.om</h1>
        <p className="text-xl mb-8">
          You&rsquo;re here. That&rsquo;s enough to begin.
          <br />
          This is a place to pause, notice, and connect.
          <br />
          Bring your attention. It opens more than you might expect.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-white hover:bg-gray-100"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
          
        </div>
      </div>
    </div>
  );
}
