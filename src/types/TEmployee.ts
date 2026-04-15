import type { CreateEmployeeInput, Employee, UpdateEmployeeInput, DeleteEmployeeInput } from '@/API';

export type IEmployee = {
  items: Employee[],
  nextToken: string,
}

export interface IIsEmpty {
  isEmpty: boolean;
  nextToken: string | null;
}
