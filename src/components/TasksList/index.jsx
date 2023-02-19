import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './TasksList.scss';

function TasksList({ tasks, setTasks, setEditId, setTitleTask }) {
  const { theme } = useContext(ThemeContext);
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
        <li key={task._id}
          className={`task ${theme}`}
        >
          <button
            onClick={() => onComplete(task._id)}>
            {task.completed ?
              <img
                className='check'
                src='/assets/icon-check.svg'
                alt='Completed'
              /> :
              <button className='incompleteTasks'></button>
            }

            {/*  Part that doesn't need an API */}

          </button>
          <p>
            {task.title}{' '}
          </p>
          <article className='config'>
            <button
              type="button"
              onClick={() => onEdit(task._id)}
            >
              <img src='/assets/icon-edit.svg' alt="" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task._id)}
            >
              <img src='/assets/icon-cross.svg' alt="" />
            </button>
          </article>
        </li>
      ))}
      <li key='test01'
        className={`task ${theme}`}>
        <button>
          <button className='incompleteTasks'></button>
        </button>
        <p>
          To study
        </p>
        <article className='config'>
          <button type="button">
            <img src='/assets/icon-edit.svg' alt="" />
          </button>
          <button
            type="button">
            <img src='/assets/icon-cross.svg' alt="" />
          </button>
        </article>
      </li>
      <li key='test01'
        className={`task ${theme}`}>
        <button>
          <img
            className='check'
            src='/assets/icon-check.svg'
            alt='Completed' />
        </button>
        <p>
          Feed the ducks
        </p>
        <article className='config'>
          <button type="button">
            <img src='/assets/icon-edit.svg' alt="" />
          </button>
          <button
            type="button">
            <img src='/assets/icon-cross.svg' alt="" />
          </button>
        </article>
      </li>
      <li key='test01'
        className={`task ${theme}`}>
        <button>
          <button className='incompleteTasks'></button>
        </button>
        <p>
          15 minutes of meditation
        </p>
        <article className='config'>
          <button type="button">
            <img src='/assets/icon-edit.svg' alt="" />
          </button>
          <button
            type="button">
            <img src='/assets/icon-cross.svg' alt="" />
          </button>
        </article>
      </li>
      <li key='test01'
        className={`task ${theme}`}>
        <button>
          <button className='incompleteTasks'></button>
        </button>
        <p>
          Go to the gym at 13:30
        </p>
        <article className='config'>
          <button type="button">
            <img src='/assets/icon-edit.svg' alt="" />
          </button>
          <button
            type="button">
            <img src='/assets/icon-cross.svg' alt="" />
          </button>
        </article>
      </li>

      {/* Until here */}

    </ul>
  );
}

export default TasksList;
