import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateTodo, deleteTask, user } from '../Reducer';
import socket from '../socket';

export default function TodoInBoard({ task, render, type }) {
  const [Task, setTask] = useState(task);
  const [more, setMore] = useState(true);
  const importantColor = ['text-red-500', 'text-yellow-500', 'text-blue-500'];

  const textFormat = (text, state) => {
    return text.length > 50 ? (state ? `${text.slice(0, 50)}...` : text) : text;
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await UpdateTodo({
        ...task,
        status: newStatus,
      });
      if (res.ok) {
        socket.emit('taskStateChange', JSON.stringify({ taskId: task._id, status: newStatus, u: user().user }));
        render((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderButtons = (type) => {
    switch (type) {
      case 0:
        return (
          <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded" onClick={() => handleStatusChange(1)}>
            Start
          </button>
        );
      case 1:
        return (
          <>
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded" onClick={() => handleStatusChange(2)}>
              Finish
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded" onClick={() => handleStatusChange(0)}>
              Pause
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded" onClick={() => handleStatusChange(1)}>
              Refuse
            </button>
            {user().user === task.admin && (
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" onClick={() => handleStatusChange(3)}>
                Confirm
              </button>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 mx-4 my-4 max-w-lg sm:max-w-md lg:max-w-xl">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold uppercase">{Task?.taskName}</span>
        <span  className={`text-2xl `}>
          <i className={"fa-solid fa-flag " + importantColor[Task?.priority]}></i>
        </span>
      </div>
      <div className="mt-2 text-center">
        <p className="text-gray-700 break-words text-balance">{textFormat(Task?.desc, more)}</p>
        {Task?.desc.length > 50 && (
          <button className="text-blue-500 text-sm mt-1" onClick={() => setMore((prev) => !prev)}>
            {more ? 'Show more' : 'Show less'}
          </button>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">{Task?.endDate.split('T')[0]}</span>
        <div className="flex items-center space-x-2">
          {Task?.users?.map((user, index) => (
            <span key={index} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200" style={{ backgroundColor: user.color }}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          ))}
          {Task?.users.length > 5 && <span className="ml-4 text-gray-500">...</span>}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {renderButtons(type)}
        <Link to={`details/${Task._id}`}>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            localStorage.setItem("ComeFrom" , "/todos")
          }}>
            Details
          </button>
        </Link>
        {Task.admin === user().user && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteTask(Task, render)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
