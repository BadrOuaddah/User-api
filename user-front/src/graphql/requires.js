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
