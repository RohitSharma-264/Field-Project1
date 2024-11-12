import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import QuickFilters from './components/QuickFilters';
import Login from './pages/Login';
import MovieBooking from './pages/MovieBooking';

const movies = [
  {
    title: "Pushpa 2- The Rule",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Pushpa_2-_The_Rule.jpg/220px-Pushpa_2-_The_Rule.jpg",
    rating: 9.2,
    languages: ["Telugu", "Hindi"]
  },
  {
    title: "Devara Part-I",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Devara_Part_1.jpg/220px-Devara_Part_1.jpg",
    rating: 8.8,
    languages: ["Telugu"]
  },
  {
    title: "Rajasaab",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a3/The_Raja_Saab_film_poster.jpeg",
    rating: 8.5,
    languages: ["Hindi","Telugu","Tamil"]
  },
  {
    title: "Blue Lock",
    image: "https://m.media-amazon.com/images/M/MV5BNWFlNmJkN2YtNGRiZS00NjExLTlmNmEtYzdiMTdiZmMzYzAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 9.0,
    languages: ["English","Japanese"]
  }
];

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended Movies</h2>
          <div className="flex gap-4">
            <button className="text-sm text-rose-500 font-medium">See All ›</button>
          </div>
        </div>

        <QuickFilters />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {movies.map((movie) => (
            <MovieCard key={movie.title} {...movie} />
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Enjoy Online Ticket Booking</h2>
            <p className="text-lg opacity-90 mb-6">
              Book movie tickets for your favorite movies from anywhere, at any time.
              Experience the best seats and great offers!
            </p>
            <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:title" element={<MovieBooking />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;