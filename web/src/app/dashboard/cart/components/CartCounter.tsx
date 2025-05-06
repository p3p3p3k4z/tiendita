'use client';

import { useState } from 'react';

interface Props {
  value?: number;
  stock: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const CartCounter = ({ value = 1, stock, onQuantityChange }: Props) => {
  const [count, setCount] = useState(value);

  const incrementCount = () => {
    if (count < stock) {
      const newCount = count + 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  const decrementCount = () => {
    if (count > 1) { // Aseguramos que la cantidad no sea menor que 1 por defecto
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrementCount}
        className="bg-gray-200 text-gray-700 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 p-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <span className="text-lg">{count}</span>
      <button
        onClick={incrementCount}
        className="bg-gray-200 text-gray-700 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 p-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};