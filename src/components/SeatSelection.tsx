import React from 'react';

interface SeatSelectionProps {
  seats: string[];
  selectedSeats: string[];
  onSeatClick: (seat: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function SeatSelection({
  seats,
  selectedSeats,
  onSeatClick,
  onContinue,
  onBack
}: SeatSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Select Seats</h2>
          <button
            onClick={onBack}
            className="text-rose-500 hover:text-rose-600 font-medium"
          >
            Back to Theatre Selection
          </button>
        </div>
        <div className="w-full bg-gray-900 h-2 rounded-full mb-8" />
        <div className="grid grid-cols-10 gap-2 max-w-3xl mx-auto">
          {seats.map(seat => (
            <button
              key={seat}
              onClick={() => onSeatClick(seat)}
              className={`p-2 text-sm rounded transition-colors ${
                selectedSeats.includes(seat)
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <button
          onClick={onContinue}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Continue to Add-ons
        </button>
      )}
    </div>
  );
}