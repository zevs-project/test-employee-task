import type { Employee } from '@/API';

export type IEmployee = {
  items: Employee[],
  nextToken: string,
}

export type TIFavourite = 'true' | 'false';

export interface IEmployeeEdit {
  id: string;
  data: Employee;
}

export interface IVariables {
  limit: number,
  nextToken: string | null,
  isFavourite?: TIFavourite,
};
