/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePosition = /* GraphQL */ `subscription OnCreatePosition($filter: ModelSubscriptionPositionFilterInput) {
  onCreatePosition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePositionSubscriptionVariables,
  APITypes.OnCreatePositionSubscription
>;
export const onUpdatePosition = /* GraphQL */ `subscription OnUpdatePosition($filter: ModelSubscriptionPositionFilterInput) {
  onUpdatePosition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePositionSubscriptionVariables,
  APITypes.OnUpdatePositionSubscription
>;
export const onDeletePosition = /* GraphQL */ `subscription OnDeletePosition($filter: ModelSubscriptionPositionFilterInput) {
  onDeletePosition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePositionSubscriptionVariables,
  APITypes.OnDeletePositionSubscription
>;
export const onCreateEmployee = /* GraphQL */ `subscription OnCreateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
  onCreateEmployee(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmployeeSubscriptionVariables,
  APITypes.OnCreateEmployeeSubscription
>;
export const onUpdateEmployee = /* GraphQL */ `subscription OnUpdateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
  onUpdateEmployee(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmployeeSubscriptionVariables,
  APITypes.OnUpdateEmployeeSubscription
>;
export const onDeleteEmployee = /* GraphQL */ `subscription OnDeleteEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
  onDeleteEmployee(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmployeeSubscriptionVariables,
  APITypes.OnDeleteEmployeeSubscription
>;
