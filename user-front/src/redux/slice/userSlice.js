import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.userList = action.payload;
    },
    addUser: (state, action) => {
      state.userList.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUser: (state, action) => {
      const index = state.userList.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
    }
  }
});

export const { setUsers, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
