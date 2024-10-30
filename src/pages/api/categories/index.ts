import { NextApiRequest, NextApiResponse } from 'next';

// Mock de dados
const categories = [
  { id: '1', name: 'Hero' },
  { id: '2', name: 'Vigilante' },
  { id: '3', name: 'Mutante' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(categories);
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
