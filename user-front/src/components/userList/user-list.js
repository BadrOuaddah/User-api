import React, { useEffect } from "react";
import "./user-list.css";
import UpdateUser from "../updateUser/update-user";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {users.map((user) => (
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
              <UpdateUser userId={user.id} />
              <br />
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                DELETE
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
