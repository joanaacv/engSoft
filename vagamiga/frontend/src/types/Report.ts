export interface Report {
  id: number;
  landlord: number;
  tenant: number;
  parking_spot: number;
  start_date: string; // formato ISO: 'YYYY-MM-DD'
  end_date: string;
  payment_confirmed: boolean;
  amount: number; // ou number, dependendo da conversão no backend
}