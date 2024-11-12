import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    
    // Check if there's a pending booking
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    if (pendingBooking) {
      const { movieTitle } = JSON.parse(pendingBooking);
      sessionStorage.removeItem('pendingBooking');
      navigate(`/movie/${movieTitle}`);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue booking movies</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-rose-500 focus:ring-rose-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm text-rose-500 hover:text-rose-600">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" className="text-rose-500 hover:text-rose-600 font-medium">
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}