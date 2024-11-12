import React, { useState } from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Ticket, Map, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateGroup from './CreateGroup';

interface BookingConfirmationProps {
  movieTitle: string;
  theatreName: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  totalAmount: number;
  bookingId: string;
}

export default function BookingConfirmation({
  movieTitle,
  theatreName,
  selectedDate,
  selectedTime,
  selectedSeats,
  totalAmount,
  bookingId
}: BookingConfirmationProps) {
  const navigate = useNavigate();
  const [showGroupModal, setShowGroupModal] = useState(false);
  const encodedAddress = encodeURIComponent(theatreName);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your tickets have been booked successfully</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-medium">{bookingId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Theatre</p>
                <p className="font-medium">{theatreName}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 text-sm mt-1"
                >
                  <Map size={14} />
                  View on Google Maps
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{selectedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Show Time</p>
                <p className="font-medium">{selectedTime}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-medium">{selectedSeats.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="font-medium">₹{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {/* Add download ticket logic */}}
              className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Download Ticket
            </button>
            
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-full flex items-center justify-center gap-2 border border-rose-500 text-rose-500 py-3 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <Users2 size={18} />
              Split Payment with Friends
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {showGroupModal && (
        <CreateGroup
          totalAmount={totalAmount}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </>
  );
}