"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useEffect, useState } from 'react';
import { Hero } from '@/types/hero';
import { CheckIcon } from '@heroicons/react/24/solid';
import { fetchHero, saveHero } from '@/services/heroService';
import { fetchCategories } from '@/services/categoryService';
import { Category } from '@/types/category';

interface HeroFormInputs {
  name: string;
  categoryId: number;
}

const HeroForm: React.FC<{}> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<HeroFormInputs>();
  const [categories, setCategories] = useState<Category[]>([]);

  const [heroId, setHeroId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams?.get('id');
    setHeroId(id || "");
  }, [searchParams]);

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
          className={`w-full p-2 border rounded mt-1 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          placeholder="Nome"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Categoria</label>
        <select
          {...register('categoryId', { required: "Selecione uma categoria" })}
          className={`w-full p-2 border rounded mt-1 focus:outline-none ${errors.categoryId ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          defaultValue=""
        >
          <option value="" disabled>Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.Id} value={category.Id}>{category.Name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
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

export default HeroForm;
