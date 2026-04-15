/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEmployee = /* GraphQL */ `subscription OnCreateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
  onCreateEmployee(filter: $filter) {
    id
    name
    isFavourite
    position
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
    position
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
    position
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEmployeeSubscriptionVariables,
  APITypes.OnDeleteEmployeeSubscription
>;
