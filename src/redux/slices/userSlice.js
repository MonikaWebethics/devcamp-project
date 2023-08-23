import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "helpers/useAxios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return useAxios
    .get(`/auth/me`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const initialState = {
  user: [],
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
