import Image from 'next/image';

export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        <Image
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2h1ZDRjOHdrMnNmdzNqNTRvMmVwYWphMjlwcG8ybWF2c2dueDg4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KlfRjingweRk4/giphy.gif"
          alt="Bienvenido a Peluche Mania"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-lime-700 mt-6">
        Bienvenido a <span className="text-yellow-500">Peluche Mania</span>
      </h1>
    </div>
  );
}