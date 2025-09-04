import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get_one_subject = createAsyncThunk(
  "subject/getone",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://qaddha-wqdood-employers.onrender.com/getonesubject",
        { _id: _id }
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("لا يوجد اتصال بالسيرفر");
      }
      return rejectWithValue(
        error.response.data?.message || "حدث خطأ غير متوقع"
      );
    }
  }
);

export const update_exam = createAsyncThunk(
  "exams/updateExam",
  async ({ updates }) => {
    const response = await axios.put(
      `https://qaddha-wqdood-employers.onrender.com/updateexam`,
      {
        ...updates,
      }
    );
    return response.data;
  }
);

const exam_slice = createSlice({
  name: "exams",
  initialState: {
    exam: {},
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_one_subject.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_one_subject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exam = action.payload;
      })
      .addCase(get_one_subject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default exam_slice.reducer;
