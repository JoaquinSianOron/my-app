import { useContext, useState } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest
} from "../api/tasksApi";
import { TaskContext } from "./taskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContexProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      console.log(response);
      // setTasks([tasks. response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async(id) => {
    try {
        const response =  await getTaskRequest(id)
        return response.data
    } catch (error) {
        console.error(error)
    }
  }

  const updateTask = async (id, newFields) => {
    try {
        const response = await updateTaskRequest(id, newFields);
        console.log(response)
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, deleteTask, createTask, getTask, updateTask}}>
      {children}
    </TaskContext.Provider>
  );
};
