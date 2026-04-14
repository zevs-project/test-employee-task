/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPosition = /* GraphQL */ `query GetPosition($id: ID!) {
  getPosition(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPositionQueryVariables,
  APITypes.GetPositionQuery
>;
export const listPositions = /* GraphQL */ `query ListPositions(
  $filter: ModelPositionFilterInput
  $limit: Int
  $nextToken: String
) {
  listPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPositionsQueryVariables,
  APITypes.ListPositionsQuery
>;
export const getEmployee = /* GraphQL */ `query GetEmployee($id: ID!) {
  getEmployee(id: $id) {
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
      positionId
      position {
        id
        title
        icon
        employees {
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
      positionId
      position {
        id
        title
        icon
        employees {
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
      positionId
      position {
        id
        title
        icon
        employees {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmployeesByFavouriteQueryVariables,
  APITypes.EmployeesByFavouriteQuery
>;
export const employeesByPositionId = /* GraphQL */ `query EmployeesByPositionId(
  $positionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  employeesByPositionId(
    positionId: $positionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      isFavourite
      positionId
      position {
        id
        title
        icon
        employees {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.EmployeesByPositionIdQueryVariables,
  APITypes.EmployeesByPositionIdQuery
>;
