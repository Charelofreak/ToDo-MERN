import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ tasks }) => {
  const getInitialTime = () => {
    const savedTime = localStorage.getItem('time');
    return savedTime ? Number(savedTime) : 25 * 60;
  };

  const [time, setTime] = useState(getInitialTime);
  const [maxTime, setMaxTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(() => {
    const savedStatus = localStorage.getItem('timerStatus');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  const [selectedTask, setSelectedTask] = useState(() => {
    const savedTask = localStorage.getItem('selectedTask');
    return savedTask ? JSON.parse(savedTask) : null;
  });
  const intervalRef = useRef(null);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          localStorage.setItem('time', newTime);
          return newTime;
        });
        if (time <= 0) {
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, time]);

  useEffect(() => {
    localStorage.setItem('timerStatus', JSON.stringify(isActive));
  }, [isActive]);

  useEffect(() => {
    localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
  }, [selectedTask]);

  const handleStart = () => {
    if (selectedTask) {
      setIsActive(true);
    } else {
      alert("Please select a task before starting the timer.");
    }
  };

  const handlePause = () => {
    if (selectedTask) {
      setIsActive(false);
    } else {
      alert("Please select a task before pausing the timer.");
    }
  };

  const handleReset = () => {
    if (selectedTask) {
      setIsActive(false);
      setTime(25 * 60); // Reset to 25 minutes
      setSelectedTask(null);
      localStorage.removeItem('time');
      localStorage.removeItem('timerStatus');
      localStorage.removeItem('selectedTask');
    } else {
      alert("Please select a task before resetting the timer.");
    }
  };

  const handleAddTime = () => {
    if (selectedTask) {
      const newTime = time + 5 * 60;
      setTime(newTime); // Add 5 minutes
      setMaxTime(newTime);
      localStorage.setItem('time', newTime);
    } else {
      alert("Please select a task before adding time.");
    }
  };

  const handleRemoveTime = () => {
    if (selectedTask) {
      const newTime = time > 5 * 60 ? time - 5 * 60 : 0;
      setTime(newTime); // Remove 5 minutes
      setMaxTime(newTime);
      localStorage.setItem('time', newTime);
    } else {
      alert("Please select a task before removing time.");
    }
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const percentage = maxTime >= 25 * 60 ? time / maxTime : time / (25 * 60);
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div className="flex w-full h-screen ml-10 flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <div className="relative flex items-center justify-center mb-8">
        <svg height="220" width="220">
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#1e293b"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#4ade80"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 110 110)"
            className="transition-all duration-1000 linear"
          />
        </svg>
        <div className="absolute text-4xl font-bold tracking-wide">
          {formatTime(time || 0)}
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddTime}
          className={`px-5 py-2 bg-green-400 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:bg-red-500 ${
            !selectedTask ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!selectedTask}
        >
          +5 min
        </button>
        <button
          onClick={handleRemoveTime}
          className={`px-5 py-2 bg-red-400 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:bg-red-500 ${
            !selectedTask ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!selectedTask}
        >
          -5 min
        </button>
      </div>
      <div className="mb-4 w-full max-w-xs">
        <h2 className="text-2xl mb-2 font-semibold">Select a Task</h2>
        <select
          value={selectedTask || ""}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>
            --Select a Task--
          </option>
          {tasks?.map((task, index) => (
            <option key={index} value={task.taskName}>
              {task.taskName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleStart}
          disabled={isActive || !selectedTask}
          className={`px-5 py-2 bg-blue-400 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:bg-blue-500 ${
            isActive || !selectedTask ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isActive || !selectedTask}
          className={`px-5 py-2 bg-yellow-400 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:bg-yellow-500 ${
            !isActive || !selectedTask ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          disabled={!selectedTask}
          className={`px-5 py-2 bg-red-400 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:bg-red-500 ${
            !selectedTask ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Reset
        </button>
      </div>
      {selectedTask && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">Current Task: {selectedTask}</h3>
        </div>
      )}
    </div>
  );
};

export default Timer;
