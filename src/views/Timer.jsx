import React, { useState, useEffect, useRef } from 'react';
import TodoDetails from '../conponents/TodoDetails';
import { useData } from '../ContextProvider';
import { getData } from '../Reducer';
import TimerItems from './TimerItems'
import { Link } from 'react-router-dom';
export default function Focus() {
  const [date, setDate] = useState(() => {
    const savedTime = localStorage.getItem('time');
    return savedTime ? new Date(JSON.parse(savedTime).date) : new Date();
  });

  const [timer, setTimer] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const timerRef = useRef(null);
  const [data, dispatch] = useData();
  const [focusedTask, setFocusedTask] = useState(() => {
    return localStorage.getItem('focusTimerTask')
      ? JSON.parse(localStorage.getItem('focusTimerTask'))
      : null;
  });

  // Fetch tasks from context or API
  useEffect(() => {
    getData(dispatch);
  }, [dispatch]);

  // Update tasks when data changes
  useEffect(() => {
    setTasks(data.task.filter( e => e.status == "1" && new Date(e.endDate).getTime()  <= new Date().getTime() + 7*24*60*60*1000) || []);
  }, [data.task]);

  // Restore timer state from localStorage
  useEffect(() => {
    const timerState = JSON.parse(localStorage.getItem('timerState'));
    if (timerState) {
      setIsActive(timerState.isActive);
      setIsPaused(timerState.isPaused);
    }
  }, []);

  // Save date and timer state to localStorage
  useEffect(() => {
    localStorage.setItem('time', JSON.stringify({ date }));
    localStorage.setItem('timerState', JSON.stringify({ isActive, isPaused }));
  }, [date, isActive, isPaused]);

  // Timer logic
  useEffect(() => {
    if (isActive && !isPaused && timer > 0) {
      timerRef.current = setInterval(() => {
        const now = new Date().getTime();
        setTimer(Math.floor((date.getTime() - now) / 1000));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused, date, timer]);

  const handleStart = () => {
    if (selectedTask && !isActive) {
      if (localStorage.getItem('pausedTime')) {
        setDate(
          new Date(
            new Date().getTime() +
              parseInt(localStorage.getItem('pausedTime')) * 1000
          )
        );
        localStorage.removeItem('pausedTime');
      } else {
        setDate(new Date(new Date().getTime() + 25 * 60 * 1000));
      }
      const task = tasks.find((task) => task.taskName === selectedTask);
      if (task) {
        setFocusedTask(task);
        setIsActive(true);
        setIsPaused(false);
        localStorage.setItem('focusTimerTask', JSON.stringify(task));
      }
    }
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
    setIsActive(false);
    localStorage.setItem('pausedTime', timer);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setDate(new Date(new Date().getTime() + 25 * 60 * 1000));
    setFocusedTask(null);
    setSelectedTask('');
  };

  const handleFinishTask = () => {
    if (focusedTask) {
      alert(`Finished task: ${focusedTask.taskName}`);
      handleReset();
    }
  };

  const handleAddTime = () => {
    setDate((prevDate) => new Date(prevDate.getTime() + 5 * 60 * 1000));
  };

  const handleSubtractTime = () => {
    if (date.getTime() - new Date().getTime() > 5 * 60 * 1000) {
      setDate((prevDate) => new Date(prevDate.getTime() - 5 * 60 * 1000));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const rightSideContent = () => {
    if (isActive && focusedTask) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Task Details</h2>
          <p className="text-lg mb-2">Current Task: {focusedTask.taskName}</p>
          <p className="text-lg mb-2">Time Remaining: {formatTime(timer)}</p>
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

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3  flex flex-col items-center justify-center p-8 sticky top-0 h-full">
  <TimerItems tasks = {tasks}></TimerItems>  
      </div>
      <div className="w-2/3 bg-gray-100 flex flex-col justify-start p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Tasks Ending This Week</h2>
        <div className="tasks w-full h-[75%] bg-white shadow-lg rounded-lg overflow-auto p-4">
          { tasks.length > 0 && tasks.map((task, i) => (
            <TodoDetails task={task} timer={true} key={i} />
          ))}
           { tasks.length == 0 && 
           <div className='mx-auto w-max h-max mt-10 text-2xl font-bold text-gray-200 '>
                  you don't have any task 
           </div>
          }
        </div>
      </div>
       <Link className='py-2 px-3 text-xl bg-white  border-2  border-black absolute left-2 top-2' to={'/todos'}>back</Link>
    </div>
  );
}
