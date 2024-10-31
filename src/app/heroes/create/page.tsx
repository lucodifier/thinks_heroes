"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState, Suspense } from 'react';
import { Hero } from '@/types/hero';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { fetchHero, saveHero } from '@/services/heroService';
import { fetchCategories } from '@/services/categoryService';
import { Category } from '@/types/category';

interface HeroFormInputs {
  name: string;
  categoryId: number;
}

const HeroForm: React.FC<{ heroId: string | null }> = ({ heroId }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<HeroFormInputs>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((response) => setCategories(response.Items));
    if (heroId) {
      fetchHero(Number(heroId)).then((response) => {
        const hero = response;
        setValue('name', hero.Name);
        setValue('categoryId', hero.Category.Id);
      });
    }
  }, [heroId, setValue]);

  const onSubmit: SubmitHandler<HeroFormInputs> = async (data: any) => {
    await saveHero(Number(heroId), data as Hero);
    router.push('/heroes');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Nome do Herói</label>
        <input
          {...register('name', { required: "O nome é obrigatório" })}
          className={`w-full p-2 border rounded mt-1 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          placeholder="Nome"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Categoria</label>
        <select
          {...register('categoryId', { required: "Selecione uma categoria" })}
          className={`w-full p-2 border rounded mt-1 focus:outline-none ${errors.categoryId ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          defaultValue=""
        >
          <option value="" disabled>Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.Id} value={category.Id}>{category.Name}</option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
      >
        <CheckIcon className="h-5 w-5 mr-2" /> {heroId ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
};

const CreateHero: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const heroId = searchParams?.get('id') || "";

  const handleBack = () => {
    router.push('/heroes');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        {heroId ? "Editar Herói" : "Criar Novo Herói"}
      </h1>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Botão Voltar */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-400 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Voltar
          </button>
        </div>

        <Suspense fallback={<div>Carregando...</div>}>
          <HeroForm heroId={heroId} />
        </Suspense>
      </div>
    </div>
  );
};

export default CreateHero;
