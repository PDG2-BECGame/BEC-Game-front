export interface UserRanking {
    name: string;
    organization: string;
    score: number;
  }
  
  export const classificationData: UserRanking[] = [
    { name: 'Juan Pérez', organization: 'Empresa XYZ', score: 1500 },
    { name: 'María López', organization: 'Corporación ABC', score: 1400 },
    { name: 'Carlos García', organization: 'Tech Solutions', score: 1300 },
    // ... más usuarios ...
  ];
  