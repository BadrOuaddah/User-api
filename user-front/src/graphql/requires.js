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
  mutation UpdateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
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
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;