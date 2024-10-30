import { NextApiRequest, NextApiResponse } from 'next';

// Mock de dados
let heroes = [
  { id: '1', name: 'Superman', categoryId: '1' },
  { id: '2', name: 'Batman', categoryId: '2' },
  // Adicione mais heróis se necessário
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Retorna o herói com o ID especificado
    const hero = heroes.find((hero) => hero.id === id);
    if (!hero) return res.status(404).json({ message: 'Herói não encontrado' });
    return res.status(200).json(hero);
  }

  if (req.method === 'DELETE') {
    // Remove o herói com o ID especificado
    heroes = heroes.filter((hero) => hero.id !== id);
    return res.status(204).end();
  }

  if (req.method === 'PUT') {
    // Atualiza o herói com o ID especificado
    const { name, categoryId } = req.body;
    const heroIndex = heroes.findIndex((hero) => hero.id === id);
    if (heroIndex === -1) return res.status(404).json({ message: 'Herói não encontrado' });
    heroes[heroIndex] = { id: String(id), name, categoryId };
    return res.status(200).json(heroes[heroIndex]);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
