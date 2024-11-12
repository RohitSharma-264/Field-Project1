import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface Theatre {
  id: number;
  name: string;
  price: number;
}

interface TheatreSelectionProps {
  theatres: Theatre[];
  showDates: string[];
  showTimes: string[];
  selectedTheatre: number | null;
  selectedDate: string;
  selectedTime: string;
  onTheatreSelect: (id: number) => void;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function TheatreSelection({
  theatres,
  showDates,
  showTimes,
  selectedTheatre,
  selectedDate,
  selectedTime,
  onTheatreSelect,
  onDateSelect,
  onTimeSelect,
  onContinue,
  onBack
}: TheatreSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="text-rose-500" />
            <h2 className="text-xl font-semibold">Select Theatre</h2>
          </div>
          <button
            onClick={onBack}
            className="text-rose-500 hover:text-rose-600 font-medium"
          >
            Back to Movies
          </button>
        </div>
        <div className="space-y-4">
          {theatres.map(theatre => (
            <div
              key={theatre.id}
              onClick={() => onTheatreSelect(theatre.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedTheatre === theatre.id
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{theatre.name}</h3>
                  <p className="text-sm text-gray-600">₹{theatre.price} onwards</p>
                </div>
                {selectedTheatre === theatre.id && (
                  <CheckCircle2 className="text-rose-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTheatre && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-rose-500" />
            <h2 className="text-xl font-semibold">Select Date</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {showDates.map(date => (
              <button
                key={date}
                onClick={() => onDateSelect(date)}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  selectedDate === date
                    ? 'bg-rose-500 text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-rose-500" />
            <h2 className="text-xl font-semibold">Select Time</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {showTimes.map(time => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`px-4 py-2 rounded-lg text-center transition-colors ${
                  selectedTime === time
                    ? 'bg-rose-500 text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTime && (
        <button
          onClick={onContinue}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Continue to Seat Selection
        </button>
      )}
    </div>
  );
}