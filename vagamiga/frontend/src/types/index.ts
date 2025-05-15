// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "owner" | "renter";
}

export interface Condominium {
  id: number;
  name: string;
  address: string;
  hourly_rate: number;
}

export interface ParkingSpace {
  id: number;
  number: string;
  location: string;
  condominium_id: number;
  owner_id: number;
  status: "available" | "occupied" | "maintenance";
  price_per_hour: number;
  image_url?: string;
}

export interface Booking {
  id: number;
  space_id: number;
  renter_id: number;
  start_time: string;
  end_time: string;
  total_price: number;
  status: "pending" | "confirmed" | "canceled";
}
export interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  condominium_id: number;
}
export interface Renter {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicle_plate: string;
  vehicle_model: string;
  vehicle_color: string;
  vehicle_year: number;
  vehicle_brand: string;
  vehicle_type: string;
}
