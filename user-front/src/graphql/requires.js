import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUserQuery {
      id
      firstName
      lastName
      email
      phoneNumber
      organization
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      firstName
      lastName
      email
      phoneNumber
      organization
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $user: UserInput!) {
    updateUser(userId: $userId, user: $user) {
      id
      firstName
      lastName
      email
      phoneNumber
      organization
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;