import axios from 'axios';
import './TasksList.scss';

function TasksList({ tasks, setTasks, setEditId, setTitleTask }) {

  const onDelete = id => {
    axios.delete(`http://localhost:3002/tasks/${id}`)
      .then(res => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.log(err));
  };

  const onEdit = (id) => {
    const task = tasks.find((task) => task._id === id);
    setTitleTask(task.title);
    setEditId(id);
  };

  const onComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    axios
      .put(`http://localhost:3002/tasks/${id}`, { completed: !task.completed })
      .then((res) => {
        const updatedTask = { ...task, completed: !task.completed };
        setTasks((prevState) =>
          prevState.map((toggle) => (toggle._id === id ? updatedTask : toggle))
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <ul className='tasksList'>
      {tasks.map((task) => (
        <li key={task._id}>
          <input type="radio" checked={task.completed} onClick={() => onComplete(task._id)} />
          {task.title}{' '}
          <button type="button" onClick={() => onEdit(task._id)}>
            Editar
          </button>
          <button type="button" onClick={() => onDelete(task._id)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
