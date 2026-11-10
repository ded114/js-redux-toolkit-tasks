import { configureStore } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
import {tasksApi} from "./tasksApi.js"
const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
})
export default store
// END
