'use client';

import { useState } from 'react';

interface Spot {
  name: string;
  description: string;
  reason: string;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [numberOfSpots, setNumberOfSpots] = useState<number>(5);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city,
          spotsCount: numberOfSpots,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch spots');
      }

      const data = await response.json();
      setSpots(data.spots || []);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Error fetching spots:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🌟 Kids Adventure Finder 🌟
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Discover amazing places for kids to explore!
          </p>
        </header>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-yellow-300">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            🗺️ Where do you want to go?
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="city" className="block text-lg font-semibold text-gray-700 mb-2">
                City Name
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Enter city name (e.g., New York)"
                className="w-full px-4 py-3 border-3 border-blue-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
              />
            </div>

            <div>
              <label htmlFor="numberOfSpots" className="block text-lg font-semibold text-gray-700 mb-2">
                How many favorite spots?
              </label>
              <input
                type="number"
                id="numberOfSpots"
                value={numberOfSpots}
                onChange={(e) => setNumberOfSpots(parseInt(e.target.value) || 1)}
                required
                min="1"
                max="20"
                className="w-full px-4 py-3 border-3 border-blue-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl text-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? '🔄 Searching...' : '🔍 Find Fun Spots!'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-2xl">
              <p className="font-semibold">⚠️ Oops! {error}</p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-300 text-center">
            <div className="animate-bounce text-6xl mb-4">🎈</div>
            <h2 className="text-2xl font-bold text-purple-600">
              Finding amazing places in {city}...
            </h2>
          </div>
        )}

        {/* Results Section */}
        {showResults && spots.length > 0 && !loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-300">
            <h2 className="text-3xl font-bold text-green-600 mb-6">
              🎉 Fun Places in {city}!
            </h2>
            <ul className="space-y-6">
              {spots.map((spot, index) => (
                <li key={index} className="border-l-4 border-purple-400 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    {spot.name}
                  </h3>
                  <p className="text-gray-700 text-lg mb-2">
                    <strong>What&apos;s there:</strong> {spot.description}
                  </p>
                  <p className="text-gray-600 text-base italic">
                    <strong>Why it&apos;s great:</strong> {spot.reason}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
