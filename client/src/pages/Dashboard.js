import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const onChange = e =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '', status: 'pending', dueDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async id => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome, {user && user.name}</p>
      <button onClick={logout}>Logout</button>

      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={newTask.status}
            onChange={onChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={onChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
