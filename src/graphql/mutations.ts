/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPosition = /* GraphQL */ `mutation CreatePosition(
  $input: CreatePositionInput!
  $condition: ModelPositionConditionInput
) {
  createPosition(input: $input, condition: $condition) {
    id
    title
    icon
    employees {
      items {
        id
        name
        isFavourite
        positionId
        position {
          id
          title
          icon
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePositionMutationVariables,
  APITypes.CreatePositionMutation
>;
export const updatePosition = /* GraphQL */ `mutation UpdatePosition(
  $input: UpdatePositionInput!
  $condition: ModelPositionConditionInput
) {
  updatePosition(input: $input, condition: $condition) {
    id
    title
    icon
    employees {
      items {
        id
        name
        isFavourite
        positionId
        position {
          id
          title
          icon
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePositionMutationVariables,
  APITypes.UpdatePositionMutation
>;
export const deletePosition = /* GraphQL */ `mutation DeletePosition(
  $input: DeletePositionInput!
  $condition: ModelPositionConditionInput
) {
  deletePosition(input: $input, condition: $condition) {
    id
    title
    icon
    employees {
      items {
        id
        name
        isFavourite
        positionId
        position {
          id
          title
          icon
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePositionMutationVariables,
  APITypes.DeletePositionMutation
>;
export const createEmployee = /* GraphQL */ `mutation CreateEmployee(
  $input: CreateEmployeeInput!
  $condition: ModelEmployeeConditionInput
) {
  createEmployee(input: $input, condition: $condition) {
    id
    name
    isFavourite
    positionId
    position {
      id
      title
      icon
      employees {
        items {
          id
          name
          isFavourite
          positionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEmployeeMutationVariables,
  APITypes.CreateEmployeeMutation
>;
export const updateEmployee = /* GraphQL */ `mutation UpdateEmployee(
  $input: UpdateEmployeeInput!
  $condition: ModelEmployeeConditionInput
) {
  updateEmployee(input: $input, condition: $condition) {
    id
    name
    isFavourite
    positionId
    position {
      id
      title
      icon
      employees {
        items {
          id
          name
          isFavourite
          positionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEmployeeMutationVariables,
  APITypes.UpdateEmployeeMutation
>;
export const deleteEmployee = /* GraphQL */ `mutation DeleteEmployee(
  $input: DeleteEmployeeInput!
  $condition: ModelEmployeeConditionInput
) {
  deleteEmployee(input: $input, condition: $condition) {
    id
    name
    isFavourite
    positionId
    position {
      id
      title
      icon
      employees {
        items {
          id
          name
          isFavourite
          positionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEmployeeMutationVariables,
  APITypes.DeleteEmployeeMutation
>;
