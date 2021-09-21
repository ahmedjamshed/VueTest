import {createSlice} from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: '',
    isLoading: true,
  },
  reducers: {
    onAuthStateChange: (state, action) => {
      (state.user = action.payload), (state.isLoading = false);
    },
  },
});
export const {onAuthStateChange} = AuthSlice.actions;

export default AuthSlice.reducer;
