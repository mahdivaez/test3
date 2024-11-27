import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string;
  isLoggedIn: boolean;
  userToken: string | null;
}

const initialState: AuthState = {
  email: '',
  isLoggedIn: false,
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
    },
  },
});

export const { setEmail, setLoggedIn, setUserToken } = authSlice.actions;
export default authSlice.reducer;

