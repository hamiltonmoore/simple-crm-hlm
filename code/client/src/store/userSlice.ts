import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types'; // Adjust path as needed

export interface UserState {
  users: User[];
  editingUser: User | null;
  loading: boolean;
  error: string;
  success: boolean;
}

const initialState: UserState = {
  users: [],
  editingUser: null,
  loading: false,
  error: '',
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    startEditing(state, action: PayloadAction<User>) {
      state.editingUser = { ...action.payload };
    },
    updateEditingUser(state, action: PayloadAction<Partial<User>>) {
      if (state.editingUser) {
        state.editingUser = { ...state.editingUser, ...action.payload };
      }
    },
    saveUserStart(state) {
      state.loading = true;
      state.error = '';
      state.success = false;
    },
    saveUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.success = true;
      state.editingUser = null;
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      } else {
        state.users.push(action.payload);
      }
    },
    saveUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    cancelEditing(state) {
      state.editingUser = null;
    },
  },
});

export const {
  setUsers,
  startEditing,
  updateEditingUser,
  saveUserStart,
  saveUserSuccess,
  saveUserFailure,
  cancelEditing,
} = userSlice.actions;

export default userSlice.reducer;