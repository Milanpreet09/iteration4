import React, { useState } from 'react';
import './index.css'; // Ensure you have linked your CSS file

const App = () => {
  // Initial tasks array
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Finalize project requirements', priority: 'low', completed: false },
    { id: 2, task: 'Research best practices', priority: 'medium', completed: false },
    { id: 3, task: 'Create initial wireframes', priority: 'high', completed: true },
    { id: 4, task: 'Define project milestones', priority: 'medium', completed: false },
    { id: 5, task: 'Schedule kickoff meeting', priority: 'low', completed: false },
  ]);

  // State to track deleted tasks (for undo feature)
  const [deletedTasks, setDeletedTasks] = useState([]);

  // State for new task input
  const [newTask, setNewTask] = useState('');

  // Function to delete a task
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setDeletedTasks([...deletedTasks, taskToDelete]); // Save deleted task for undo
    setTasks(tasks.filter((task) => task.id !== taskId)); // Remove the task from tasks
  };

  // Function to undo delete
  const undoDelete = (taskId) => {
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
    if (taskToRestore) {
      setTasks([...tasks, taskToRestore]); // Restore the deleted task
      setDeletedTasks(deletedTasks.filter((task) => task.id !== taskId)); // Remove from deleted tasks
    }
  };

  // Function to toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to change priority of a task
  const changePriority = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, priority: getNextPriority(task.priority) } : task
    ));
  };

  // Helper function to cycle through priorities (low -> medium -> high -> low)
  const getNextPriority = (currentPriority) => {
    if (currentPriority === 'low') return 'medium';
    if (currentPriority === 'medium') return 'high';
    return 'low';
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Prevent adding an empty task
    const newTaskObj = {
      id: tasks.length + 1,
      task: newTask,
      priority: 'low',
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask(''); // Clear the input field
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {/* Add New Task */}
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask} className="add-task-btn">
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-text">{task.task}</span>

            <div className="buttons">
              {/* Priority Button (Star) */}
              <button
                className={`priority-btn ${task.priority}`}
                onClick={() => changePriority(task.id)}
              >
                ★
              </button>

              {/* Complete Button */}
              <button
                className={`complete-btn ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>

              {/* Delete Button */}
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                Delete
              </button>
            </div>

            {/* Undo Button for Deleted Tasks */}
            {deletedTasks.some((deleted) => deleted.id === task.id) && (
              <button onClick={() => undoDelete(task.id)} className="undo-btn">
                Undo Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
