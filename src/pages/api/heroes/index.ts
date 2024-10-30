import { NextApiRequest, NextApiResponse } from 'next';

// Mock de dados
let heroes = [
  { id: '1', name: 'Superman', categoryId: '1' },
  { id: '2', name: 'Batman', categoryId: '2' },
  // Adicione mais heróis se necessário
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Retorna todos os heróis
    return res.status(200).json(heroes);
  }

  if (req.method === 'POST') {
    // Cria um novo herói
    const { id, name, categoryId } = req.body;
    const newHero = { id, name, categoryId };
    heroes.push(newHero);
    return res.status(201).json(newHero);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
