import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './AddTask.scss';

function AddTask({ editId, setEditId, titleTask, setTitleTask, tasks, setTasks }) {
  const { theme } = useContext(ThemeContext);
  const onSubmit = (event) => {
    event.preventDefault();
    if (editId) {
      onUpdate();
    } else if (titleTask !== '') {
      onAdd();
    }
    setTitleTask('');
  };

  const onAdd = () => {
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
        .then(res => {
          const newTask = res.data;
          setTasks([...tasks, newTask]);
        })
        .catch(err => console.log(err));
    }
    setTitleTask('');
  };

  const onUpdate = () => {
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

  return (
    <form onSubmit={onSubmit} className={`addTask ${theme}`}>
      <button type="submit">
        {editId ? 'ATT' : '+'}
      </button>
      <input placeholder='Create a new todo' value={titleTask} onChange={e => setTitleTask(e.target.value)} />
    </form>
  );
}

export default AddTask;
