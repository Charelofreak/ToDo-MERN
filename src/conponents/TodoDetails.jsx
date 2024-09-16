import React, { useState, useEffect, useRef } from 'react';
import { UpdateTodo, deleteTask, user } from '../Reducer';
import { Link } from 'react-router-dom';

export default function TodoDetails({ task, type, render, search, timer }) {
  const [Task, setTask] = useState(task);
  const [timerString, setTimerString] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const intervalRef = useRef(null);
  const importantColor = ['text-red-500', 'text-yellow-500', 'text-blue-500'];

  useEffect(() => {
    if (timer) {
      intervalRef.current = setInterval(() => {
        const end = new Date(Task.endDate).getTime();
        const now = new Date().getTime();
        const distance = end - now;

        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);

        setTimerString({ d: days, h: hours, m: minutes, s: seconds });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [Task.endDate, timer]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await UpdateTodo({
        ...task,
        status: newStatus,
      });
      if (res.ok) {
        render((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderButtons = () => {
    switch (type) {
      case 0:
        return (
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleStatusChange(1)}
          >
            Start
          </button>
        );
      case 1:
        return (
          <>
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStatusChange(2)}
            >
              Finish
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStatusChange(0)}
            >
              Pause
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStatusChange(1)}
            >
              Refuse
            </button>
            {user().user === task.admin && (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleStatusChange(3)}
              >
                Confirm
              </button>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const formatString = (str, type) => {
    if (type !== 'date') return str.length < 15 ? str : str.slice(0, 13) + '...';
    return str.length < 10 ? str : str.slice(0, 10);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 mx-auto my-1 w-[98%] flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center space-x-2">
        <span className={`fa-solid fa-flag text-2xl mr-3 ${importantColor[Task?.priority]}`}></span>
        <span className="text-lg font-bold uppercase">{Task?.taskName}</span>
      </div>
      <span className="w-full sm:w-1/3 text-center truncate" title={Task?.desc}>
        {formatString(Task?.desc)}
      </span>
      {!timer && <span>{formatString(Task?.endDate, 'date')}</span>}
      {timer && (
        <span className="w-max shrink">
          d: {timerString.d} h: {timerString.h} m: {timerString.m} s: {timerString.s}
        </span>
      )}
      <div className="flex items-center space-x-2">
        {Task?.users.map((e, i) => (
          <span
            key={i}
            style={{ background: e.color }}
            className="text-center p-1 uppercase px-3 rounded-full"
          >
            {e.name.charAt(0)}
          </span>
        ))}
      </div>
      <div className="flex gap-3 w-full sm:w-auto justify-end">
        {renderButtons()}
        <Link
          to={`/todos/details/${Task._id}`}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            localStorage.setItem('ComeFrom', timer ? '/todos/timer' : '/todos');
          }}
        >
          Details
        </Link>
        {!timer && Task.admin === user().user && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteTask(Task, render, search)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
