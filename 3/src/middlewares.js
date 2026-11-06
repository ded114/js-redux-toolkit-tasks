const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const addDate = (store) => (next) => (action) => {
  // BEGIN (write your solution here)
  if (action.type !== "TASK_ADD"){
    return next(action)
  }
  const  date = new Date().toLocaleDateString("ru-RU")
  const {task} = action.payload
  return next({
    ...action,
    payload: {
      ...action.payload,
      task: {
        ...task,
        text: `Задача на ${date}: ${task.text}`
      }
    }
  })
  // END
};

export default { logger, addDate };
