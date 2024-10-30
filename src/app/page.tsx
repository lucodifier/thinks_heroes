"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToHeroes = () => {
    router.push('/heroes');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Bem-vindo ao Portal de Heróis
        </h1>
        <p className="text-lg text-white mb-12">
          Explore e gerencie os maiores heróis do mundo!
        </p>

        <button
          onClick={navigateToHeroes}
          className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition-all duration-300"
        >
          Ver Lista de Heróis
        </button>
      </div>
    </div>
  );
}
