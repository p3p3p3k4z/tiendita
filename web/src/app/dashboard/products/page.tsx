// src/app/dashboard/products/page.tsx
'use client'; // Directiva 'use client' aquí para poder usar hooks
import ProductList from './components/ProductList';
import { Metadata } from 'next';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import { initialProducts } from '@/app/data/products';
import { useCart } from '@/app/context/CartContext';

const ProductsPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity > 0 && quantity <= product.npiezas) {
      addToCart(product, quantity);
      alert(`${quantity} "${product.nombre}" agregado(s) al carrito.`);
    } else if (quantity > product.npiezas) {
      alert(`No hay suficiente stock de "${product.nombre}". Disponibles: ${product.npiezas}`);
    } else {
      alert('Por favor, selecciona una cantidad válida.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Nuestros Peluches</h1>
      <ProductList products={initialProducts} onAddToCart={handleAddToCart} />
      <div className="mt-4">
        <Link href="/dashboard/cart" className="text-blue-500 hover:underline">Ir al carrito</Link>
      </div>
    </div>
  );
};

export default ProductsPage;