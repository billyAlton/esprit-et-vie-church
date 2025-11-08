// hooks/useTestimonies.ts
import { useState, useEffect } from 'react';
import { TestimonyService, Testimony } from '@/src/services/testimony.service';

export function useTestimonies(category?: string, featured?: boolean) {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        setLoading(true);
        const response = await TestimonyService.getApprovedTestimonies({
          category,
          featured,
          limit: 50 // Récupérer un bon nombre de témoignages
        });
        setTestimonies(response.data);
      } catch (err) {
        console.error('Erreur récupération témoignages:', err);
        setError('Erreur lors du chargement des témoignages');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  }, [category, featured]);

  return { testimonies, loading, error };
}