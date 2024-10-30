// src/app/heroes/create/page.tsx
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Hero } from '@/types/hero';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';

interface HeroFormInputs {
  name: string;
  categoryId: string;
}

const CreateHero: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const heroId = searchParams.get('id'); // Pega o ID do herói, se houver
  const { register, handleSubmit, reset, setValue } = useForm<HeroFormInputs>();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Carregar lista de categorias ao montar o componente
    api.get('/categories').then((response) => {
      setCategories(response.data);
    });

    // Se houver um ID, buscar os dados do herói para edição
    if (heroId) {
      api.get(`/heroes/${heroId}`).then((response) => {
        const hero = response.data;
        setValue('name', hero.name);
        setValue('categoryId', hero.categoryId);
      });
    }
  }, [heroId, setValue]);

  const onSubmit: SubmitHandler<HeroFormInputs> = async (data) => {
    if (heroId) {
      // Atualizar o herói existente
      await api.put(`/heroes/${heroId}`, data);
    } else {
      // Criar um novo herói
      await api.post<Hero>('/heroes', data);
    }
    // Redirecionar para a lista de heróis após salvar
    router.push('/heroes');
  };

  const handleBack = () => {
    router.push('/heroes');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        {heroId ? "Editar Herói" : "Criar Novo Herói"}
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Nome do Herói</label>
            <input
              {...register('name', { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              placeholder="Nome"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Categoria</label>
            <select
              {...register('categoryId', { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
          >
            <CheckIcon className="h-5 w-5 mr-2" /> {heroId ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHero;
