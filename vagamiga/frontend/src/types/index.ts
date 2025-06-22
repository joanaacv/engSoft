// src/types/index.ts
export interface Condominium {
  id: number;
  name: string;
  address: string;
  hourly_rate: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  condominium_id?: number;
  is_admin: boolean;
}

export interface Resident {
  id: number;
  balance: number;
  user_id: number;
}

export interface ParkingSpace {
  id: number;
  name: string;
  condominium_id: number;
  owner_id: number;
  for_rent: boolean;
}

export interface Lease {
  id: number;
  parking_spot_id: number;
  landlord_id: number;
  tenant_id: number;
  start_time: string;
  end_time: string;
  total_price: number;
  status: "pending" | "confirmed" | "canceled";
}


