import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleTask, setTitleTask] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const funcAdd = (event) => {
    event.preventDefault();
    if (editId) {
      const newTask = tasks.map(task => {
        if (task._id === editId) {
          return { _id: task._id, title: titleTask };
        }
        return task;
      });
      setTasks(newTask);
      setEditId(null);
    } if (titleTask !== '') {
      axios.post('http://localhost:3002/tasks', { title: titleTask })
        .then(res => setTasks([...tasks, res.data]))
        .catch(err => console.log(err));
    }
    setTitleTask('');
  };

  const funcDelete = id => {
    axios.delete(`http://localhost:3002/tasks/${id}`)
      .then(res => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.log(err));
  };

  const funcEdit = (id) => {
    const task = tasks.find((task) => task._id === id);
    setTitleTask(task.title);
    setEditId(id);
  };

  const funcUpdate = () => {
    if (!editId) return;
    const task = tasks.find((task) => task._id === editId);
    axios
      .put(`http://localhost:3002/tasks/${editId}`, { title: titleTask })
      .then((res) => {
        const updatedTask = { ...task, title: titleTask };
        setTasks((prevState) =>
          prevState.map((t) => (t._id === editId ? updatedTask : t))
        );
        setTitleTask("");
        setEditId(null);
      })
      .catch((error) => console.log(error));
  };

  const funcComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    axios
      .put(`http://localhost:3002/tasks/${id}`, { title: task.title, completed: !task.completed })
      .then((res) => {
        const updatedTask = { ...task, completed: !task.completed };
        setTasks((prevState) =>
          prevState.map((t) => (t._id === id ? updatedTask : t))
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={editId ? () => funcUpdate(editId) : funcAdd}>
        <input value={titleTask} onChange={e => setTitleTask(e.target.value)} />
        <button type="submit">
          {editId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}{' '}
            <button type="button" onClick={() => funcEdit(task._id)}>
              Editar
            </button>
            <button type="button" onClick={() => funcDelete(task._id)}>
              Excluir
            </button>
            <button type="button" onClick={() => funcComplete(task._id)}>
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
