// src/app/layout.tsx
import { CartProvider } from './context/CartContext'; // Asegúrate de la ruta correcta
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tiendita de Juguetes',
  description: 'La mejor tienda de juguetes en línea.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}