import React, { useState } from 'react';
import { CreditCard, Tag, X } from 'lucide-react';

interface PaymentSummaryProps {
  movieTitle: string;
  theatreName: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  ticketPrice: number;
  addOnsTotal: number;
  onBack: () => void;
  onContinue: (couponCode: string) => void;
}

export default function PaymentSummary({
  movieTitle,
  theatreName,
  selectedDate,
  selectedTime,
  selectedSeats,
  ticketPrice,
  addOnsTotal,
  onBack,
  onContinue
}: PaymentSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = selectedSeats.length * ticketPrice;
  const convenienceFee = selectedSeats.length*25;
  const total = subtotal + addOnsTotal + convenienceFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode === 'FIRST50') {
      setDiscount(50);
      setAppliedCoupon(couponCode);
      setShowCouponInput(false);
    }
    else if (couponCode === 'MOVIEMANIA') {
      setDiscount(150);
      setAppliedCoupon(couponCode);
      setShowCouponInput(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon('');
    setCouponCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={onBack}
          className="text-rose-500 hover:text-rose-600 font-medium"
        >
          Back to Add-ons
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="text-rose-500" />
          <h2 className="text-xl font-semibold">Payment Summary</h2>
        </div>

        <div className="border-b pb-4 mb-4">
          <h3 className="font-semibold mb-2">Booking Details</h3>
          <div className="text-sm space-y-2 text-gray-600">
            <p>Movie: {movieTitle}</p>
            <p>Theatre: {theatreName}</p>
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedTime}</p>
            <p>Seats: {selectedSeats.join(", ")}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>Tickets ({selectedSeats.length} × ₹{ticketPrice})</span>
            <span>₹{subtotal}</span>
          </div>
          {addOnsTotal > 0 && (
            <div className="flex justify-between">
              <span>Add-ons Total</span>
              <span>₹{addOnsTotal}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Convenience Fee</span>
            <span>₹{convenienceFee}</span>
          </div>
          
          {!showCouponInput && !appliedCoupon && (
            <button
              onClick={() => setShowCouponInput(true)}
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600"
            >
              <Tag size={16} />
              Apply Coupon
            </button>
          )}

          {showCouponInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
              >
                Apply
              </button>
            </div>
          )}

          {appliedCoupon && (
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
              <div>
                <span className="text-green-600 font-medium">{appliedCoupon}</span>
                <span className="text-green-600 ml-2">-₹{discount}</span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={() => onContinue(appliedCoupon)}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}