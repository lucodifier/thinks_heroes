import api from './api';
import { Hero } from '../types/hero';

interface HeroResponse {
  Total: number;
  Items: Hero[];
}

export const fetchHeroes = async (skip: number, take: number): Promise<HeroResponse> => {
  try {
    const response = await api.get<HeroResponse>(`/heroes?skip=${skip}&take=${take}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching heroes:", error);
    throw error;
  }
};
export const fetchHero = async (id: number): Promise<Hero> => {
  try {
    const response = await api.get<Hero>(`/heroes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching heroes:", error);
    throw error;
  }
};

export const saveHero = async (id: number, data: Hero): Promise<Hero> => {
  try {
    if (id>0){
      const response = await api.put(`/heroes/${id}`, data);
      return response.data;
    }
    else {
      const response = await api.post(`/heroes`, data);
      return response.data;
    }
  } catch (error) {
    console.error("Error save hero:", error);
    throw error;
  }

}

export const deleteHero = async (id: number): Promise => {
  try {
      await api.delete(`/heroes/${id}`);
  } catch (error) {
    console.error("Error save hero:", error);
    throw error;
  }
}