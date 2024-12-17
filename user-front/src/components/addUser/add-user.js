import React, { useState } from "react";
import "./add-user.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/requires";

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    role: ""
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: { user: newUser }
      });
      alert("User created successfully!");
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        organization: "",
        role: ""
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="add-user-container">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          value={newUser.email}
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={newUser.phoneNumber}
          placeholder="Phone Number"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="organization"
          value={newUser.organization}
          placeholder="Organization"
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          type="text"
          name="role"
          value={newUser.role}
          placeholder="Role"
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
      <br />
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
};

export default AddUser;
