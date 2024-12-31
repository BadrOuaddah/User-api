import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../configuration/apollo-client";
import {
  GET_ALL_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from "../../graphql/requires";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await client.query({ query: GET_ALL_USERS });
  return data.getAllUserQuery;
});

export const addUser = createAsyncThunk("users/addUser", async (userInput) => {
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { user: userInput }
  });
  return data.createUser;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userInput }) => {
    const { data } = await client.mutate({
      mutation: UPDATE_USER,
      variables: { userId, user: userInput }
    });
    return data.updateUser;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const { data } = await client.mutate({
      mutation: DELETE_USER,
      variables: { id: userId }
    });
    return data.DELETE_USER;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.userList.push(action.payload);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.userList.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
    });
  }
});

export default userSlice.reducer;
