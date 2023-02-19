import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from '../AddTask';
import TasksList from '../TasksList';
import Footer from '../Footer';

function CardTasks() {
    const [tasks, setTasks] = useState([]);
    const [titleTask, setTitleTask] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3002/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <AddTask
                tasks={tasks}
                setTasks={setTasks}
                editId={editId}
                setEditId={setEditId}
                titleTask={titleTask}
                setTitleTask={setTitleTask}
            />
            <TasksList
                tasks={tasks}
                setTasks={setTasks}
                setEditId={setEditId}
                setTitleTask={setTitleTask}
            />
            <Footer
                tasks={tasks}
            />
        </>
    )
}

export default CardTasks;