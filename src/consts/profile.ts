export interface User {
  name: string;
  email: string;
  organization: string;
  totalScore: number;
}

export const USER_DATA: User = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  organization: 'Empresa XYZ',
  totalScore: 1200,
};