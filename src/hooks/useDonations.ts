import { Donation, DonationService } from "@/src/services/donation.service";
import { useState, useEffect } from "react";

export function useDonations(params?: any) {
  const [data, setData] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await DonationService.getAllDonations(params);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]); // Re-fetch when params change

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
}