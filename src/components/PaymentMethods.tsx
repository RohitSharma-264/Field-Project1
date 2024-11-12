import React from 'react';
import { CreditCard, Wallet, Building2, QrCode } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

const PAYMENT_METHODS = [
  {
    id: 'credit',
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Pay securely with your credit card'
  },
  {
    id: 'debit',
    name: 'Debit Card',
    icon: CreditCard,
    description: 'Use your debit card for payment'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Building2,
    description: 'Pay directly from your bank account'
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: QrCode,
    description: 'Pay using any UPI app'
  },
  {
    id: 'wallet',
    name: 'Wallets',
    icon: Wallet,
    description: 'Paytm, PhonePe, Amazon Pay etc.'
  }
];

export default function PaymentMethods({ selectedMethod, onMethodSelect }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      {PAYMENT_METHODS.map(({ id, name, icon: Icon, description }) => (
        <div
          key={id}
          onClick={() => onMethodSelect(id)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            selectedMethod === id
              ? 'border-rose-500 bg-rose-50'
              : 'border-transparent hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Icon className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}