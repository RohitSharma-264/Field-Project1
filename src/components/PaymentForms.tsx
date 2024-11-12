import React, { useState } from 'react';

interface PaymentFormsProps {
  method: string;
  onSubmit: () => void;
}

export default function PaymentForms({ method, onSubmit }: PaymentFormsProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const renderCreditDebitForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );

  const renderUPIForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="username@upi"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );

  const renderNetBankingForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Bank
        </label>
        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          required
        >
          <option value="">Select a bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="axis">Axis Bank</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );

  const renderWalletsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map((wallet) => (
          <button
            key={wallet}
            type="submit"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            {wallet}
          </button>
        ))}
      </div>
    </form>
  );

  switch (method) {
    case 'credit':
    case 'debit':
      return renderCreditDebitForm();
    case 'upi':
      return renderUPIForm();
    case 'netbanking':
      return renderNetBankingForm();
    case 'wallet':
      return renderWalletsForm();
    default:
      return null;
  }
}