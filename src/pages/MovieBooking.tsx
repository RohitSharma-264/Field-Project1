import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddOns from '../components/AddOns';
import PaymentMethods from '../components/PaymentMethods';
import PaymentForms from '../components/PaymentForms';
import BookingSteps from '../components/BookingSteps';
import TheatreSelection from '../components/TheatreSelection';
import SeatSelection from '../components/SeatSelection';
import PaymentSummary from '../components/PaymentSummary';
import BookingConfirmation from '../components/BookingConfirmation';
import { FOOD_ITEMS, MERCHANDISE_ITEMS } from '../data/concessions';

const SEAT_PRICE = 250;
const THEATRES = [
  { id: 1, name: 'PVR Inorbit Mall - Cyberabad', price: 350 },
  { id: 2, name: 'AMB Cinemas - Gachibowli', price: 400 },
  { id: 3, name: 'INOX GVK One - Banjara Hills', price: 380 },
  { id: 4, name: 'Prasads Multiplex - Necklace Road', price: 300 },
  { id: 5, name: 'Asian M Cube Mall - Attapur', price: 280 },
  { id: 6, name: 'PVR Icon - Hitech City', price: 350 }
];

const SHOW_DATES = ['Today', 'Tomorrow', 'Sun, 24 Mar', 'Mon, 25 Mar', 'Tue, 26 Mar'];
const SHOW_TIMES = ['10:30 AM', '1:45 PM', '4:30 PM', '7:15 PM', '10:00 PM'];
const SEATS = Array.from({ length: 60 }, (_, i) => String.fromCharCode(65 + Math.floor(i / 10)) + (i % 10 + 1));

export default function MovieBooking() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTheatre, setSelectedTheatre] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [foodQuantities, setFoodQuantities] = useState<Record<number, number>>({});
  const [merchQuantities, setMerchQuantities] = useState<Record<number, number>>({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // Store current movie details in session storage
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        movieTitle: title,
        step,
        selectedTheatre,
        selectedDate,
        selectedTime,
        selectedSeats,
        foodQuantities,
        merchQuantities
      }));
      navigate('/login');
    }
  }, []);

  const handleSeatClick = (seat: string) => {
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleFoodQuantityChange = (id: number, quantity: number) => {
    setFoodQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleMerchQuantityChange = (id: number, quantity: number) => {
    setMerchQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const calculateAddOnsTotal = () => {
    const foodTotal = FOOD_ITEMS.reduce((sum, item) => 
      sum + (item.price * (foodQuantities[item.id] || 0)), 0);
    const merchTotal = MERCHANDISE_ITEMS.reduce((sum, item) => 
      sum + (item.price * (merchQuantities[item.id] || 0)), 0);
    return foodTotal + merchTotal;
  };

  const handlePayment = () => {
    setBookingComplete(true);
  };

  const theatre = THEATRES.find(t => t.id === selectedTheatre);
  const ticketPrice = theatre ? theatre.price : SEAT_PRICE;
  const addOnsTotal = calculateAddOnsTotal();
  const subtotal = selectedSeats.length * ticketPrice;
  const discount = appliedCoupon === 'FIRST50' ? 50 : 0;
  const convenienceFee = 50;
  const totalAmount = subtotal + addOnsTotal + convenienceFee - discount;

  if (bookingComplete) {
    return (
      <BookingConfirmation
        movieTitle={decodeURIComponent(title || '')}
        theatreName={theatre?.name || ''}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedSeats={selectedSeats}
        totalAmount={totalAmount}
        bookingId={`BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-zinc-900 text-white mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => navigate('/')} className="text-2xl font-bold text-rose-500">
              ShowTime
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{decodeURIComponent(title || '')}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <BookingSteps currentStep={step} />
        </div>

        {step === 1 && (
          <TheatreSelection
            theatres={THEATRES}
            showDates={SHOW_DATES}
            showTimes={SHOW_TIMES}
            selectedTheatre={selectedTheatre}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTheatreSelect={setSelectedTheatre}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onContinue={() => setStep(2)}
            onBack={() => navigate('/')}
          />
        )}
        {step === 2 && (
          <SeatSelection
            seats={SEATS}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            onContinue={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <AddOns
            foodQuantities={foodQuantities}
            merchQuantities={merchQuantities}
            onFoodQuantityChange={handleFoodQuantityChange}
            onMerchQuantityChange={handleMerchQuantityChange}
            onContinue={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <PaymentSummary
            movieTitle={decodeURIComponent(title || '')}
            theatreName={theatre?.name || ''}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
            ticketPrice={ticketPrice}
            addOnsTotal={addOnsTotal}
            onBack={() => setStep(3)}
            onContinue={(coupon) => {
              setAppliedCoupon(coupon);
              setStep(5);
            }}
          />
        )}
        {step === 5 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
            <PaymentMethods
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
            />
            {paymentMethod && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-6">Enter Payment Details</h2>
                <PaymentForms
                  method={paymentMethod}
                  onSubmit={handlePayment}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}