import React, { useState } from "react";
import "./update-user.css";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/requires";

const UpdateUser = () => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [isShownForm, setIsShownForm] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  console.log(setIsConfirmed);

  const handleClick = (event) => {
    if (!isConfirmed) {
      setIsShownForm((current) => !current);
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
          <form className="update-border">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            />
            <br />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
            />
            <br />
            <input type="email" name="email" placeholder="Email" required />
            <br />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              required
            />
            <br />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              required
            />
            <br />
            <input type="text" name="role" placeholder="Role" required />
            <button type="submit" className="confirm-button">
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
