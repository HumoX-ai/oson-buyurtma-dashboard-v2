import { UserInfo } from "@/lib/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  users: UserInfo[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserInfo>) => {
      state.users = [...state.users, action.payload];
    },
    setUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserInfo>) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, setUsers, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
