import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "helpers/useAxios";

export const fetchBootCamp = createAsyncThunk(
  "bootCamp/fetchBootCamp",
  async () => {
    return useAxios
      .get("/bootcamps")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const addBootCamp = createAsyncThunk(
  "bootCamp/addBootCamp",
  async (newBootCampData, { rejectWithValue }) => {
    try {
      const response = await useAxios.post("/bootcamps", newBootCampData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ errMsg: "An error occurred." });
      }
    }
  }
);

export const deleteBootCamp = createAsyncThunk(
  "bootCamp/deleteBootCamp",
  async (id) => {
    try {
      const response = await useAxios.delete(`/bootcamps/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getBootCamp = createAsyncThunk(
  "bootCamp/getBootCamp",
  async (id) => {
    return useAxios
      .get(`/bootcamps/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const editBootCamp = createAsyncThunk(
  "bootCamp/editBootCamp",
  async (newBootCampData, thunkAPI) => {
    const id = newBootCampData.id;
    try {
      const response = await useAxios.put(`/bootcamps/${id}`, newBootCampData);
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
  bootCampList: [],
  bootCamp: [],
  error: null,
  isLoading: false,
};

const bootCampSlice = createSlice({
  name: "bootCamp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBootCamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBootCamp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCampList = action.payload;
      })
      .addCase(fetchBootCamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(addBootCamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBootCamp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCampList = action.payload;
      })
      .addCase(addBootCamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(deleteBootCamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBootCamp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCampList.data = state.bootCampList.data.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteBootCamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(editBootCamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBootCamp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCampList = action.payload;
      })
      .addCase(editBootCamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      .addCase(getBootCamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBootCamp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bootCamp = action.payload;
      })
      .addCase(getBootCamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default bootCampSlice.reducer;
