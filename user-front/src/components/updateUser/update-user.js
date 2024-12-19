import React, { useState } from "react";
import "./update-user.css";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/requires";

const UpdateUser = ({ userId }) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [isShownForm, setIsShownForm] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  console.log(setIsConfirmed);
  const [userUpdated, setUserUpdated] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    role: ""
  });

  const handleClick = (event) => {
    if (!isConfirmed) {
      setIsShownForm((current) => !current);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdated((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ variables: { userId, user: userUpdated } });
      alert("User updated successfully!");
      setIsShownForm(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>
        UPDATE
      </button>
      {isShownForm && (
        <div>
          <br />
          <form className="update-border" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userUpdated.firstName}
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={userUpdated.lastName}
              required
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userUpdated.email}
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userUpdated.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={userUpdated.organization}
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={userUpdated.role}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="confirm-button" disabled={loading}>
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
