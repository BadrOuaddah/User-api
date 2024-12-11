import React from "react";
import axios from "axios";

export default class UserList extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/api/v1/users`).then((res) => {
      const users = res.data;
      this.setState({ users });
    });
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => (
          <div>
            <div class="card text-left">
              <div class="card-body">
                <h4 class="card-title">USERS</h4>
                <p class="card-text">
                  <p key={user.id}>
                    ID : {user.id}
                    <p>Fist Name : {user.firstName}</p>
                    <p>Last Name : {user.lastName}</p>
                    <p>E-mail : {user.email}</p>
                    <p>Phone number : {user.phoneNumber}</p>
                    <p>Organization : {user.organization}</p>
                  </p>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
