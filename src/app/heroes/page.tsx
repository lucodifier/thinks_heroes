"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Hero } from '@/types/hero';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { fetchCategories } from '@/services/categoryService';
import { deleteHero, fetchHeroes } from '@/services/heroService';
import { Category } from '@/types/category';

const HeroesList: React.FC = () => {
  const router = useRouter();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0); 
  const [page, setPage] = useState(1); 
  const [take] = useState(5); 
  const [showModal, setShowModal] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState<Number | null>(null);

  const totalPages = Math.ceil(total / take);

  useEffect(() => {
    getHeroes(page);
    getCategories();
  }, [page]);

  const getHeroes = async (page: number) => {
    const skip = (page - 1) * take;
    try {
      const data = await fetchHeroes(skip, take);
      setHeroes(data.Items);
      setTotal(data.Total);
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.Items);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.Id === categoryId);
    return category ? category.Name : 'Desconhecido';
  };

  const navigateToCreate = () => {
    router.push('/heroes/create');
  };

  const handleEdit = (id: Number) => {
    router.push(`/heroes/create?id=${id}`);
  };

  const confirmDelete = (id: Number) => {
    setHeroToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (heroToDelete) {
      try {
        await deleteHero(Number(heroToDelete));
        setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.Id !== heroToDelete));
      } catch (error) {
        console.error("Erro ao deletar o herói:", error);
      } finally {
        setShowModal(false);
        setHeroToDelete(null);
      }
    }
  };

  
  const goToPreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () => setPage((prevPage) => Math.min(prevPage + 1, totalPages));

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8">Lista de Heróis</h1>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={navigateToCreate}
            className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> Novo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-left">Categoria</th>
                <th className="py-3 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {heroes && heroes.map((hero, index) => (
                <tr key={`${hero.Id}-${index}`} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{hero.Name}</td>
                  <td className="py-3 px-6 text-left">{getCategoryName(hero.Category.Id)}</td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center space-x-2 justify-end">
                      <button
                        onClick={() => handleEdit(hero.Id)}
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                      >
                        <PencilIcon className="h-5 w-5 mr-1" /> Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(hero.Id)}
                        className="text-red-500 hover:text-red-600 flex items-center"
                      >
                        <TrashIcon className="h-5 w-5 mr-1" /> Apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">Página {page} de {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
            <p className="mb-4">Tem certeza de que deseja excluir este herói?</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setHeroToDelete(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
              >
                Sim, Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroesList;
