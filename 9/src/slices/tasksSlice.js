import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
export const removeTask = createAsyncThunk("tasks/removeTasks", async (id) => {
  await axios.delete(routes.taskPath(id))
  return id
})
export const addTask = createAsyncThunk("tasks/addTasks", async ({name}) => {
  const response = await axios.post(routes.tasksPath(), {name})
  return response.data
})
const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState()
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, {payload}) => {
        tasksAdapter.setAll(state, payload)
      })
      .addCase(removeTask.fulfilled, (state, {payload: id}) => {
        tasksAdapter.removeOne(state, id)
      })
      .addCase(addTask.fulfilled, (state, {payload}) => {
        tasksAdapter.addOne(state, payload)
      })
  }
})
export const {actions} = tasksSlice
export const selectors = tasksAdapter.getSelectors((state) => state.tasks)
export default tasksSlice.reducer
// END
