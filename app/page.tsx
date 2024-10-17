"use client";

import { useState } from 'react';

export default function HomePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Send password to API route for authentication
    const res = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    

    const data = await res.json();

    if (data.authenticated) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Enter Password to Access</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="w-full max-w-sm bg-gray-900 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    );
  }

  // If authenticated, render the original page content
  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Welcome to Easy Docs</h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          The simplest way to create and manage your documentation.
        </p>
      </div>
    </main>
  );
}
