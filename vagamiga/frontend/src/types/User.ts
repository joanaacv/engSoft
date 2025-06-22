export interface User {
  user_id: number;
  resident_id: number | null;
  name: string;
  email: string;
  password: string;
  condominium: number;
  is_admin: boolean;
  balance: number | null;
}
