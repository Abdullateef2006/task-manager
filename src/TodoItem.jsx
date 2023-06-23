import { useState } from "react";
const TaskManager = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task ', description: 'Description ', category: 'Important', completed: false },
    // { id: 2, title: 'Task 2', description: 'Description 2', category: 'Not important', completed: false },
    // { id: 3, title: 'Task 3', description: 'Description 3', category: 'Important', completed: false }
  ]);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: '' });

  const filteredTasks = tasks.filter(task => filterCategory === 'All' || task.category === filterCategory);

  const handleFilterChange = event => {
    setFilterCategory(event.target.value);
  };

  const handleInputChange = event => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description && newTask.category) {
      const taskId = tasks.length + 1;
      const updatedTasks = [...tasks, { ...newTask, id: taskId, completed: false }];
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '', category: '' });
    }
  };

  const handleDeleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-manager">
      <h1 className="task-manager__title">Task Manager</h1>
      <div className="task-manager__filter">
        <label htmlFor="categoryFilter" className="task-manager__filter-label">Filter by Category:</label>
        <select id="categoryFilter" className="task-manager__filter-select" value={filterCategory} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Important">Important</option>
          <option value="Not important">Not Important</option>
        </select>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h2 className="task-item__title">{task.title}</h2>
            <p className="task-item__description">{task.description}</p>
            <p className="task-item__category">Category: {task.category}</p>
            <button className="task-item__button" onClick={() => handleCompleteTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="task-item__button" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="add-task">
        <h2 className="add-task__title">Add Task</h2>
        <input
          type="text"
          name="title"
          className="add-task__input"
          placeholder="Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          className="add-task__input"
          placeholder="Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          className="add-task__input"
          placeholder="Category"
          value={newTask.category}
          onChange={handleInputChange}
        />
        <button className="add-task__button" onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskManager;
