import React, { useState } from "react";
import "./add-user.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../../graphql/requires";

const AddUser = ({ refetch }) => {
  const [newUser, setNewUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    role: ""
  });
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleInputChange = () => {};

  const handleSubmit = async () => {};

  return (
    <div>
      <form className="center">
        {newUser.id && (
          <input
            type="text"
            name="id"
            value={newUser.id}
            placeholder="User ID (Read-only)"
            readOnly
          />
        )}
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="email"
          name="email"
          value={newUser.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={newUser.phoneNumber}
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="organization"
          value={newUser.organization}
          placeholder="Organization"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="role"
          value={newUser.role}
          placeholder="Role"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button type="button" onClick={handleSubmit}>
          Add User
          {/* {newUser.id ? "Update User" : "Add User"} */}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
