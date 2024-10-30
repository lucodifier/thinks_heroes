import api from './api';
import { Category } from '../types/category';

interface CategoryResponse {
  Total: number;
  Items: Category[];
}


export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await api.get<CategoryResponse>('/Category');
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
