import {useTasks} from'../context/taskProvider'
import {useNavigate} from 'react-router-dom'


function TasksCard({ task }) {
  const {deleteTask} = useTasks()
  const navigate = useNavigate()


  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done === 1 ? "✔️" : "❌"}</span>
      <span>{task.createdAt}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
    </div>
  );
}

export default TasksCard;
