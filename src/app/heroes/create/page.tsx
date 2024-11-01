"use client";

import { Suspense} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import HeroForm from "@/app/components/HeroForm";

const CreateHero: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/heroes');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        Cadastro Heroi
      </h1>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-400 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Voltar
          </button>
        </div>

      
        <Suspense fallback={<div>Carregando...</div>}>
          <HeroForm />
        </Suspense>
      </div>
    </div>
  );
};

export default CreateHero;
