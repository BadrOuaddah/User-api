import "./App.css";
import UserList from "./components/userList/user-list";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import AddUser from "./components/addUser/add-user";

function App() {
  return (
    <div className="App">
      <br />
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
