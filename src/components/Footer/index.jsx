import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './Footer.scss';

function Footer({ tasks }) {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const { theme } = useContext(ThemeContext);


  return (
    <footer className={`footer ${theme}`}>
        <h3>{incompleteTasks.length} items left</h3>
      <ul>
        <li>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
        <button>
          Clear Completed
        </button>
    </footer>
  )
};

export default Footer;