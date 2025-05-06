'use client';
import { Product } from '@/app/types/product';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductList = ({ products, onAddToCart }: Props) => {
  if (!products || products.length === 0) {
    return <p>No hay peluches disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((peluche) => (
        <ProductItem key={peluche.id} peluche={peluche} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;