import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "helpers/useAxios";

export const fetchCourse = createAsyncThunk(
  "bootCamp/fetchCourse",
  async (id) => {
    return useAxios
      .get(`/bootcamps/${id}/courses`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const deleteCourse = createAsyncThunk(
  "bootCamp/deleteCourse",
  async (id) => {
    try {
      const response = await useAxios.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addCourse = createAsyncThunk(
  "bootCamp/addCourse",
  async (newCourseData, { rejectWithValue }) => {
    try {
      const id = newCourseData.bootcamp_id;
      const response = await useAxios.post(
        `/bootcamps/${id}/courses/add`,
        newCourseData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
  return useAxios
    .get(`/courses/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const editCourse = createAsyncThunk(
  "course/editCourse",
  async (newCourseData, thunkAPI) => {
    const id = newCourseData.id;
    try {
      const response = await useAxios.patch(`/courses/${id}`, newCourseData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ errMsg: "An error occurred." });
      }
    }
  }
);

const initialState = {
  courseList: [],
  course: [],
  error: null,
  isLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseList = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseList.data = state.courseList.data.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(addCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseList = action.payload;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(editCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCampList = action.payload;
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default courseSlice.reducer;
