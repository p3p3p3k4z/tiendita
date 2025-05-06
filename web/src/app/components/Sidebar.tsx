import Image from 'next/image';
import { IoBrowsersOutline, IoCalculator, IoLogoReact, IoListSharp,IoCartSharp } from 'react-icons/io5';
import { SidebarMenuItem } from './SidebarMenuItem';
import logoImg from '../../../public/logo/logo.png';

const menuItems = [
  {
    path: '/dashboard/main',
    icon: <IoBrowsersOutline size={40} />,
    title: 'Dashboard',
    subTitle: 'Productos'
  },
  {
    path: '/dashboard/products', 
    icon: <IoListSharp size={40} />, 
    title: 'Peluches',
    subTitle: 'Lista de productos'
  },
  {
    path: '/dashboard/cart', // Ruta a tu página del carrito
    icon: <IoCartSharp size={40} />, // Icono del carrito
    title: 'Carrito',
    subTitle: 'Tu lista de compras'
  },
]


export const Sidebar = () => {
  return (

    <div id="menu" 
      style={{ width: '400px' }}
      className="bg-lime-950 min-h-screen z-10 text-slate-300 w-64 left-0  overflow-y-scroll">

      <div id="logo" className="px-6">
        <span>
          <Image
            src={logoImg}
            alt="Tu Logo"
            width={250}
            height={150}
            className="object-contain"
          />
        </span>
      </div>


      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <Image className="rounded-full w-8 h-8" 
              src="https://e1.pngegg.com/pngimages/453/631/png-clipart-domo-domo-kun-illustration-thumbnail.png" 
              alt="User avatar" 
              width={50}
              height={50}
            />
          </span>
          <span className="text-sm md:text-base font-bold">
            Pepe Pecas
          </span>
        </a>
      </div>


      <div id="nav" className="w-full px-6">
      
        {
          menuItems.map( item => (
              <SidebarMenuItem  key={ item.path } {...item} />
          ))
        }
      </div>
    </div>
  )
}
