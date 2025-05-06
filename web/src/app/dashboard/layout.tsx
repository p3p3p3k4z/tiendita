// src/app/dashboard/layout.tsx
import { Metadata } from 'next';
import { Sidebar } from '../components';

export const metadata: Metadata = {
  title: 'Dashboard - Tienda de Juguetes',
  description: 'Panel de administración de la tienda de juguetes.',
  // Puedes añadir más propiedades de metadata aquí si lo deseas
};

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

      <div className="flex">

        <Sidebar />

        <div className="p-2 w-full text-slate-900">
          { children }
        </div>

      </div>
    </div>
  );
}