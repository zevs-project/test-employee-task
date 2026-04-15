/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEmployee = /* GraphQL */ `query GetEmployee($id: ID!) {
  getEmployee(id: $id) {
    id
    name
    isFavourite
    position
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmployeeQueryVariables,
  APITypes.GetEmployeeQuery
>;
export const listEmployees = /* GraphQL */ `query ListEmployees(
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      isFavourite
      position
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEmployeesQueryVariables,
  APITypes.ListEmployeesQuery
>;
export const employeesByName = /* GraphQL */ `query EmployeesByName(
  $name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  employeesByName(
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      isFavourite
      position
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmployeesByNameQueryVariables,
  APITypes.EmployeesByNameQuery
>;
export const employeesByFavourite = /* GraphQL */ `query EmployeesByFavourite(
  $isFavourite: String!
  $sortDirection: ModelSortDirection
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  employeesByFavourite(
    isFavourite: $isFavourite
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      isFavourite
      position
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmployeesByFavouriteQueryVariables,
  APITypes.EmployeesByFavouriteQuery
>;
