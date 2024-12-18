import React from "react";
import "./user-list.css";
import { gql, useQuery, useMutation } from "@apollo/client";

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

const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

const UserList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
    onError: (err) => {
      console.error("Error deleting user:", err);
      alert("Error deleting user: " + err.message);
    }
  });

  const handleDelete = async (id) => {
    try {
      await deleteUser({ variables: { userId: id } });
    } catch (err) {
      console.error("Error during delete operation:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getAllUserQuery.map((user) => (
        <div key={user.id} className="card text-left">
          <div className="card-body">
            <h4 className="card-title">USER {user.id}</h4>
            <p className="card-text">
              <p>ID: {user.id}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Organization: {user.organization}</p>
              <p>Role: {user.role}</p>
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
