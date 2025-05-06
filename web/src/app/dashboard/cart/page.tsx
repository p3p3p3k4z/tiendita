// src/app/dashboard/cart/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types/product';
import { initialProducts } from '@/app/data/products';
import { CartCounter } from './components/CartCounter'; // Importa CartCounter

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Filtramos los items del carrito y les adjuntamos la información del producto
  const cartItemsWithProduct = cartItems.map(cartItem => {
    const product = initialProducts.find(p => p.id === cartItem.productId);
    return product ? { ...cartItem, product } : null;
  }).filter((item): item is { product: Product; quantity: number } => item !== null);

  const calculateTotalPrice = () => {
    return cartItemsWithProduct.reduce((total, item) => total + item.product.precio * item.quantity, 0);
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Carrito de Compras</h1>
      <ul className="space-y-4">
        {cartItemsWithProduct.map((item) => (
          <li key={item.product.id} className="bg-white rounded-md shadow-md p-4 flex items-center space-x-4">
            <div className="w-24 h-24 relative overflow-hidden rounded-md">
              <Image
                src={`/images/${item.product.imagen}`}
                alt={item.product.nombre}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.product.nombre}</h3>
              <p className="text-gray-600 text-sm">{item.product.descripcion?.substring(0, 80)}...</p>
              <div className="flex items-center space-x-2 mt-2">
                <label htmlFor={`quantity-${item.product.id}`} className="text-sm text-gray-700">Cantidad:</label>
                <CartCounter
                  value={item.quantity}
                  stock={item.product.npiezas}
                  onQuantityChange={(newQuantity) => handleQuantityChange(item.product.id, newQuantity)}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-500 font-bold">${(item.product.precio * item.quantity).toFixed(2)}</p>
              <button
                className="text-red-500 hover:text-red-700 text-sm mt-2"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-gray-300 pt-4 flex justify-end items-center space-x-4">
        <span className="text-lg font-semibold text-gray-800">Precio Total:</span>
        <span className="text-xl text-green-600 font-bold">${calculateTotalPrice().toFixed(2)}</span>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Link href="/dashboard/products" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">Seguir Comprando</Link>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CartPage;