import React from 'react';
import { ShoppingBag, Package } from 'lucide-react';
import FoodItem from './FoodItem';
import MerchandiseItem from './MerchandiseItem';
import { FOOD_ITEMS, MERCHANDISE_ITEMS } from '../data/concessions';

interface AddOnsProps {
  foodQuantities: Record<number, number>;
  merchQuantities: Record<number, number>;
  onFoodQuantityChange: (id: number, quantity: number) => void;
  onMerchQuantityChange: (id: number, quantity: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AddOns({
  foodQuantities,
  merchQuantities,
  onFoodQuantityChange,
  onMerchQuantityChange,
  onContinue,
  onBack
}: AddOnsProps) {
  const foodTotal = FOOD_ITEMS.reduce((sum, item) => 
    sum + (item.price * (foodQuantities[item.id] || 0)), 0);
  const merchTotal = MERCHANDISE_ITEMS.reduce((sum, item) => 
    sum + (item.price * (merchQuantities[item.id] || 0)), 0);
  const totalAmount = foodTotal + merchTotal;

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={onBack}
          className="text-rose-500 hover:text-rose-600 font-medium"
        >
          Back to Seat Selection
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="text-rose-500" />
          <h2 className="text-xl font-semibold">Food & Beverages</h2>
        </div>
        <div className="space-y-4">
          {FOOD_ITEMS.map(item => (
            <FoodItem
              key={item.id}
              {...item}
              quantity={foodQuantities[item.id] || 0}
              onQuantityChange={onFoodQuantityChange}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Package className="text-rose-500" />
          <h2 className="text-xl font-semibold">Movie Merchandise</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MERCHANDISE_ITEMS.map(item => (
            <MerchandiseItem
              key={item.id}
              {...item}
              quantity={merchQuantities[item.id] || 0}
              onQuantityChange={onMerchQuantityChange}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-3">
          {foodTotal > 0 && (
            <div className="flex justify-between items-center text-gray-600">
              <span>Food & Beverages Total</span>
              <span>₹{foodTotal}</span>
            </div>
          )}
          {merchTotal > 0 && (
            <div className="flex justify-between items-center text-gray-600">
              <span>Merchandise Total</span>
              <span>₹{merchTotal}</span>
            </div>
          )}
          <div className="flex justify-between items-center font-semibold text-lg pt-3 border-t">
            <span>Total Add-ons</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
        <button
          onClick={onContinue}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors mt-6"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}