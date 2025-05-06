// src/app/dashboard/products/components/ProductItem.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/app/types/product';
import { CartCounter } from '../../cart/components/CartCounter';

interface Props {
  peluche: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductItem = ({ peluche, onAddToCart }: Props) => {
  const [quantityToCart, setQuantityToCart] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantityToCart(newQuantity);
  };

  const handleAddToCartClick = () => {
    onAddToCart(peluche, quantityToCart);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="relative w-full h-48 overflow-hidden rounded-md">
        <Image
          src={`/images/${peluche.imagen}`}
          alt={peluche.nombre}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">{peluche.nombre}</h3>
        <p className="text-gray-600 text-sm">{peluche.descripcion?.substring(0, 60)}...</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-yellow-500 font-bold">${peluche.precio.toFixed(2)}</span>
          <span className="text-gray-500 text-sm">Stock: {peluche.npiezas}</span>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <label htmlFor={`quantity-${peluche.id}`} className="text-sm text-gray-700">Cantidad:</label>
          <CartCounter
            value={1}
            stock={peluche.npiezas}
            onQuantityChange={handleQuantityChange}
          />
          <button
            className="bg-yellow-500 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded-md text-sm"
            onClick={handleAddToCartClick}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;