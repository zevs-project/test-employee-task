/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePositionInput = {
  id?: string | null,
  title: string,
  icon?: string | null,
};

export type ModelPositionConditionInput = {
  title?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  and?: Array< ModelPositionConditionInput | null > | null,
  or?: Array< ModelPositionConditionInput | null > | null,
  not?: ModelPositionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Position = {
  __typename: "Position",
  id: string,
  title: string,
  icon?: string | null,
  employees?: ModelEmployeeConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelEmployeeConnection = {
  __typename: "ModelEmployeeConnection",
  items:  Array<Employee | null >,
  nextToken?: string | null,
};

export type Employee = {
  __typename: "Employee",
  id: string,
  name: string,
  isFavourite?: string | null,
  positionId: string,
  position?: Position | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePositionInput = {
  id: string,
  title?: string | null,
  icon?: string | null,
};

export type DeletePositionInput = {
  id: string,
};

export type CreateEmployeeInput = {
  id?: string | null,
  name: string,
  isFavourite?: string | null,
  positionId: string,
};

export type ModelEmployeeConditionInput = {
  name?: ModelStringInput | null,
  isFavourite?: ModelStringInput | null,
  positionId?: ModelIDInput | null,
  and?: Array< ModelEmployeeConditionInput | null > | null,
  or?: Array< ModelEmployeeConditionInput | null > | null,
  not?: ModelEmployeeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateEmployeeInput = {
  id: string,
  name?: string | null,
  isFavourite?: string | null,
  positionId?: string | null,
};

export type DeleteEmployeeInput = {
  id: string,
};

export type ModelPositionFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPositionFilterInput | null > | null,
  or?: Array< ModelPositionFilterInput | null > | null,
  not?: ModelPositionFilterInput | null,
};

export type ModelPositionConnection = {
  __typename: "ModelPositionConnection",
  items:  Array<Position | null >,
  nextToken?: string | null,
};

export type ModelEmployeeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  isFavourite?: ModelStringInput | null,
  positionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelEmployeeFilterInput | null > | null,
  or?: Array< ModelEmployeeFilterInput | null > | null,
  not?: ModelEmployeeFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionPositionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPositionFilterInput | null > | null,
  or?: Array< ModelSubscriptionPositionFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionEmployeeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  isFavourite?: ModelSubscriptionStringInput | null,
  positionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmployeeFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmployeeFilterInput | null > | null,
};

export type CreatePositionMutationVariables = {
  input: CreatePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type CreatePositionMutation = {
  createPosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePositionMutationVariables = {
  input: UpdatePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type UpdatePositionMutation = {
  updatePosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePositionMutationVariables = {
  input: DeletePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type DeletePositionMutation = {
  deletePosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEmployeeMutationVariables = {
  input: CreateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type CreateEmployeeMutation = {
  createEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEmployeeMutationVariables = {
  input: UpdateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type UpdateEmployeeMutation = {
  updateEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEmployeeMutationVariables = {
  input: DeleteEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type DeleteEmployeeMutation = {
  deleteEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPositionQueryVariables = {
  id: string,
};

export type GetPositionQuery = {
  getPosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPositionsQueryVariables = {
  filter?: ModelPositionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPositionsQuery = {
  listPositions?:  {
    __typename: "ModelPositionConnection",
    items:  Array< {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEmployeeQueryVariables = {
  id: string,
};

export type GetEmployeeQuery = {
  getEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEmployeesQueryVariables = {
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmployeesQuery = {
  listEmployees?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      name: string,
      isFavourite?: string | null,
      positionId: string,
      position?:  {
        __typename: "Position",
        id: string,
        title: string,
        icon?: string | null,
        employees?:  {
          __typename: "ModelEmployeeConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EmployeesByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmployeesByNameQuery = {
  employeesByName?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      name: string,
      isFavourite?: string | null,
      positionId: string,
      position?:  {
        __typename: "Position",
        id: string,
        title: string,
        icon?: string | null,
        employees?:  {
          __typename: "ModelEmployeeConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EmployeesByFavouriteQueryVariables = {
  isFavourite: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmployeesByFavouriteQuery = {
  employeesByFavourite?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      name: string,
      isFavourite?: string | null,
      positionId: string,
      position?:  {
        __typename: "Position",
        id: string,
        title: string,
        icon?: string | null,
        employees?:  {
          __typename: "ModelEmployeeConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EmployeesByPositionIdQueryVariables = {
  positionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmployeesByPositionIdQuery = {
  employeesByPositionId?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      name: string,
      isFavourite?: string | null,
      positionId: string,
      position?:  {
        __typename: "Position",
        id: string,
        title: string,
        icon?: string | null,
        employees?:  {
          __typename: "ModelEmployeeConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePositionSubscriptionVariables = {
  filter?: ModelSubscriptionPositionFilterInput | null,
};

export type OnCreatePositionSubscription = {
  onCreatePosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePositionSubscriptionVariables = {
  filter?: ModelSubscriptionPositionFilterInput | null,
};

export type OnUpdatePositionSubscription = {
  onUpdatePosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePositionSubscriptionVariables = {
  filter?: ModelSubscriptionPositionFilterInput | null,
};

export type OnDeletePositionSubscription = {
  onDeletePosition?:  {
    __typename: "Position",
    id: string,
    title: string,
    icon?: string | null,
    employees?:  {
      __typename: "ModelEmployeeConnection",
      items:  Array< {
        __typename: "Employee",
        id: string,
        name: string,
        isFavourite?: string | null,
        positionId: string,
        position?:  {
          __typename: "Position",
          id: string,
          title: string,
          icon?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
};

export type OnCreateEmployeeSubscription = {
  onCreateEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
};

export type OnUpdateEmployeeSubscription = {
  onUpdateEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEmployeeSubscriptionVariables = {
  filter?: ModelSubscriptionEmployeeFilterInput | null,
};

export type OnDeleteEmployeeSubscription = {
  onDeleteEmployee?:  {
    __typename: "Employee",
    id: string,
    name: string,
    isFavourite?: string | null,
    positionId: string,
    position?:  {
      __typename: "Position",
      id: string,
      title: string,
      icon?: string | null,
      employees?:  {
        __typename: "ModelEmployeeConnection",
        items:  Array< {
          __typename: "Employee",
          id: string,
          name: string,
          isFavourite?: string | null,
          positionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
