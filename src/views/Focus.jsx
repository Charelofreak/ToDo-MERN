import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../ContextProvider';
import { getData } from '../Reducer';
import TodoDetails from '../conponents/TodoDetails';




export default function Focus() {
  const [date, setDate] = useState(0);
  const [timer, setTimer] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(() => {
  });
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusedTask, setFocusedTask] = useState(null);
  const intervalRef = useRef(null);
  const [data, dispatch] = useData();

  // Fetch tasks from context or API
  useEffect(() => {
    getData(dispatch);
  }, [dispatch]);

  // Update tasks when data changes
  useEffect(() => {
    setTasks(data.task || []);
  }, [data.task]);

  // Start the date  when selectedTask changes
  useEffect(() => {

    if (isActive && !isPaused) {
      i = setInterval(() => {
        const now = new Date().getTime();
        if (date !== 0)
          ;

      }, 1000);

    }

  },

    [isActive, isPaused]);

  // Save date  to localStorage when it changes
  // Handle starting the date 
  const handleStart = () => {
    if (selectedTask && !isActive) {
      if (date === 0) {
        setDate(t => new Date(new Date().getTime() + 25 * 60 * 1000));
      }
      const task = tasks.find((task) => task.taskName === selectedTask);
      if (task) {
        setFocusedTask(task);
        setIsActive(true);
        setIsPaused(false);
      }
    }
  };

  // Handle pausing the date 
  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
    setIsActive(false);
  };

  // Handle resetting the date  and task selection
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setDate(t => new Date(new Date().getTime() + 25 * 60 * 1000));
    setFocusedTask(null);
    setSelectedTask('');

  };

  // Handle finishing the focused task
  const handleFinishTask = () => {
    if (focusedTask) {
      alert(`Finished task: ${focusedTask.taskName}`);
      handleReset();
    }
  };

  // Handle adding time to the date 
  const handleAddTime = () => {
    setDate((prevTimer) => prevTimer + 5 * 60);
  };

  // Handle subtracting time from the date 
  const handleSubtractTime = () => {
    setDate((prevTimer) => (prevTimer > 5 * 60 ? prevTimer - 5 * 60 : 0));
  };

  // Format time into mm:ss format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Right side content based on active date 
  const rightSideContent = () => {
    if (isActive && focusedTask) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Task Details</h2>
          <p className="text-lg mb-2">Current Task: {focusedTask.taskName}</p>
          <p className="text-lg mb-2">Time Remaining: {formatTime(date)}</p>
          <button
            onClick={handleFinishTask}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition duration-300"
          >
            Finish Task
          </button>
        </div>
      );
    } else {
      return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Focus on a Task</h2>
          <p className="text-lg">Choose one task to focus on.</p>
        </div>
      );
    }
  };

  // Ensure tasks are loaded before rendering
  if (!data) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 bg-blue-700 flex flex-col items-center justify-center p-8 sticky top-0 h-full">
        <h1 className="text-4xl font-bold text-white mb-4">Focus Timer</h1>
        <div className="text-6xl font-bold text-white mb-4">{formatTime(date)}</div>
        <div className="mb-4 flex space-x-2">
          <button
            onClick={handleAddTime}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition duration-300"
          >
            +5 min
          </button>
          <button
            onClick={handleSubtractTime}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition duration-300"
          >
            -5 min
          </button>
        </div>
        <div className="mb-4 w-full">
          <select
            className="w-full p-2 border rounded shadow"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            disabled={isActive}
          >
            <option value="">Select a Task</option>
            {tasks.map((task, index) => (
              <option key={index} value={task.taskName}>
                {task.taskName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 space-x-4">
          <button
            onClick={handleStart}
            className={`bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full shadow transition duration-300 ${!selectedTask || isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedTask || isActive}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow transition duration-300 ${!isActive || isPaused ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isActive || isPaused}
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition duration-300 ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isActive}
          >
            Reset
          </button>
        </div>
        {rightSideContent()}
      </div>
      <div className="w-2/3 bg-gray-100 flex flex-col justify-start p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Tasks Ending This Week</h2>
        <div className="tasks w-full h-[75%] bg-white shadow-lg rounded-lg overflow-auto p-4">
          {tasks.map((task, i) => (
            <TodoDetails task={task} date={true} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
