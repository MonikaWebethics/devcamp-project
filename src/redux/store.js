import { configureStore } from "@reduxjs/toolkit";
import bootCampSlice from "redux/slices/bootCampSlice";
import courseSlice from "redux/slices/courseSlice";
import userSlice from "redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    bootCamp: bootCampSlice,
    course: courseSlice,
    user: userSlice,
  },
});
