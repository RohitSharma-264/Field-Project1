import React from 'react';

interface BookingStepsProps {
  currentStep: number;
}

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex items-center gap-8">
      {[1, 2, 3, 4].map(stepNumber => (
        <div
          key={stepNumber}
          className={`flex items-center ${stepNumber !== 1 ? 'ml-4' : ''}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= stepNumber ? 'bg-rose-500 text-white' : 'bg-gray-200'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber !== 4 && (
            <div
              className={`w-8 h-0.5 ml-4 ${
                currentStep > stepNumber ? 'bg-rose-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}