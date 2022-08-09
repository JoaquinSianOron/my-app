import { useEffect } from "react";
import TasksCard from "../components/TaskCard";
import {useTasks} from '../context/taskProvider';

function TasksPage() {
  const {tasks, loadTasks} = useTasks();  

  useEffect(() => {

    loadTasks();
  }, []);

  function renderMain() {
    if(tasks.length === 0)
    return <h1>No task yet</h1>
    return tasks.map((task) => (
        <TasksCard task={task} key={task.id} />
      ))
  }

  return (
    <div>
      <h1>tasks</h1>

      {renderMain()}
    </div>
  );
}

export default TasksPage;
