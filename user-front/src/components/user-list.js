import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_USERS = gql`
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

const UserList = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getAllUserQuery.map((user) => (
        <div key={user.id} className="card text-left">
          <div className="card-body">
            <h4 className="card-title">USER</h4>
            <p className="card-text">
              <p>ID: {user.id}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Organization: {user.organization}</p>
              <p>Role: {user.role}</p>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
