// src/services/testimony.service.ts
import apiClient from '@/lib/apiCaller';

export interface Testimony {
  _id: string;
  title: string;
  content: string;
  author_name: string;
  author_location?: string;
  category: string;
  status: 'pending' | 'approved' | 'scheduled' | 'archived' | 'rejected';
  scheduled_date?: string;
  images: string[];
  is_featured: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonyFormData {
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  author_location?: string;
  category: string;
  images?: File[]; // Ajout du champ images
}

export interface TestimonyStats {
  byStatus: Array<{ _id: string; count: number }>;
  total: number;
  featured: number;
}

export class TestimonyService {
  // Soumettre un témoignage avec support des images
  static async submitTestimony(data: TestimonyFormData | FormData): Promise<{ success: boolean; message: string; data: any }> {
    // Si c'est un FormData (avec images), on l'utilise directement
    if (data instanceof FormData) {
      const response = await apiClient.post('/testimonies/submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
    
    // Sinon, on envoie en JSON normal
    const response = await apiClient.post('/testimonies/submit', data);
    return response.data;
  }

  // Récupérer les témoignages approuvés (public)
  static async getApprovedTestimonies(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<{ data: Testimony[]; pagination: any }> {
    const response = await apiClient.get('/testimonies/public', { params });
    return response.data;
  }
}