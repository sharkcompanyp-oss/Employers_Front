import { configureStore } from "@reduxjs/toolkit";
import exam_reducer from "./exam_slice";

export const store = configureStore({
  reducer: {
    exam: exam_reducer,
  },
});
