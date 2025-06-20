export interface ParkingSpot {
  id: number;
  spot_name: string;
  condominium: number; // ou Condominium se quiser expandido
  for_rent: boolean;
  owner: number | null; // ou Resident se quiser expandido
}

  