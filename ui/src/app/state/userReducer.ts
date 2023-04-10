import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { DEFAULT_PROFILE_IMAGE } from './defaultProfileImage';

const initialState = {
  username: 'Guest',
  firstName: 'FIRST NAME',
  lastName: 'LAST NAME',
  email: 'mail@mail.at',
  profileImage: DEFAULT_PROFILE_IMAGE,
} satisfies User;

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
