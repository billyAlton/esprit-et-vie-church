// src/services/testimony.service.ts
import  apiClient  from '@/lib/apiCaller';

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
}

export interface TestimonyStats {
  byStatus: Array<{ _id: string; count: number }>;
  total: number;
  featured: number;
}

export class TestimonyService {
  // Soumettre un témoignage (public)
  static async submitTestimony(data: TestimonyFormData): Promise<{ success: boolean; message: string; data: any }> {
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

  // Les méthodes admin ne sont pas accessibles depuis le front public
  // Elles seront utilisées dans l'admin panel avec l'apiCaller authentifié
}