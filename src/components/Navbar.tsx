import React from 'react';
import { Search, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 
              onClick={() => navigate('/')} 
              className="text-2xl font-bold text-rose-500 cursor-pointer"
            >
              ShowTime
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Movies, Events, Plays, Sports"
                className="w-96 bg-zinc-800 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <select className="bg-transparent text-sm">
              <option>Hyderabad</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-rose-500 px-4 py-1 rounded-md text-sm hover:bg-rose-600 transition-colors"
            >
              <User size={16} />
              {localStorage.getItem('isLoggedIn') ? 'My Account' : 'Sign In'}
            </button>
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}