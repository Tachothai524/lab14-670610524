interface Registrant {
  id: number | string; 
  fullName: string;
  gender: string; 
  plan: string; 
  total: number;
  extraItem: string[];
}
export type { Registrant };

