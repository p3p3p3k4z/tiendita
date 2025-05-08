// src/app/dashboard/products/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types/product';
import { initialProducts } from '@/app/data/products'; // Importa la función para obtener los productos

const ProductsPage = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await initialProducts();
                if (productosData) {
                    setProducts(productosData);
                } else {
                    setError('No se pudieron obtener los productos.');
                }
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleAddToCart = (product: Product, quantity: number) => {
        if (quantity > 0 && quantity <= product.npiezas) {
            addToCart(product, quantity); // Pasa el objeto product completo
            alert(`${quantity} "${product.nombre}" agregado(s) al carrito.`);
        } else if (quantity > product.npiezas) {
            alert(`No hay suficiente stock de "${product.nombre}". Disponibles: ${product.npiezas}`);
        } else {
            alert('Por favor, selecciona una cantidad válida.');
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (            <div className="p-6 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Nuestros Peluches</h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product: Product) => {
                        // Construye la ruta de la imagen correctamente
                        const imagePath = `/images/${product.imagen}`;

                        return (
                            <div key={product.id} className="bg-white rounded-md shadow-md p-4">
                                <div className="w-full h-48 relative overflow-hidden rounded-md mb-4">
                                    <Image
                                        src={imagePath}
                                        alt={product.nombre}
                                        layout="fill"
                                        objectFit="contain"
                                        onError={() => console.error(`Error loading image: ${imagePath}`)}
                                    />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">{product.nombre}</h2>
                                <p className="text-gray-600 text-sm">{product.descripcion}</p>
                                <p className="text-blue-500 font-bold mt-2">${product.precio}</p>
                                <p className="text-gray-700 text-sm">Disponibles: {product.npiezas}</p>
                                <div className="mt-4 flex items-center space-x-2">
                                    <label htmlFor={`quantity-${product.id}`} className="text-sm text-gray-700">
                                        Cantidad:
                                    </label>
                                    <input
                                        type="number"
                                        id={`quantity-${product.id}`}
                                        min="1"
                                        max={product.npiezas.toString()}
                                        defaultValue="1"
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                                        onClick={() => {
                                            const quantityInput = document.getElementById(`quantity-${product.id}`) as HTMLInputElement;
                                            const quantity = parseInt(quantityInput.value, 10);
                                            handleAddToCart(product, quantity); // Pasa el objeto product
                                        }}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                                <Link href={`/dashboard/products/${product.id}`} className="text-green-500 hover:underline mt-2 block">
                                    Ver detalle
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-4">
                    <p className="text-gray-700">No hay peluches disponibles.</p>
                    <Link href="/dashboard/cart" className="text-blue-500 hover:underline">
                        Ir al carrito
                    </Link>
                </div>
            )}
            <div className="mt-4">
                <Link href="/dashboard/cart" className="text-blue-500 hover:underline">Ir al carrito</Link>
            </div>
        </div>
    );
};

export default ProductsPage;

/*'use client'; // Directiva 'use client' aquí para poder usar hooks
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

export default ProductsPage;*/