"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

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
            <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-2" />
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-gray-700"
          >
            <Image src="/github.svg" alt="GitHub" width={20} height={20} className="mr-2 invert" />
            Sign in with GitHub
          </button>
          {/* Apple and Facebook require more setup (e.g., Apple Developer Program, Facebook App)
              For scaffolding, we'll include placeholders. */}
          <button
            onClick={() => signIn("apple")}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-900"
          >
            <Image src="/apple.svg" alt="Apple" width={20} height={20} className="mr-2 invert" />
            Sign in with Apple
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} className="mr-2" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
