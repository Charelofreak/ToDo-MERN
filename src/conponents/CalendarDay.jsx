import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function CalendarDay({ date, tasks }) {
  const colors = useMemo(() => ['#EF4444', '#FBBF24', '#3B82F6'], []);

  sessionStorage.setItem('ComeFrom', '/todos/calendar');

  return (
    <div className="day z-0 rounded-lg relative overflow-hidden col-span-1 row-span-1 bg-white shadow-md shadow-teal-600">
      <span className="date uppercase w-full block font-semibold text-center bg-teal-500 text-white py-1 rounded-t-lg">
        {new Date(date).toDateString().split(' ').slice(1, 3).reverse().join(' ')}
      </span>

      <div className="tasks-container overflow-auto flex flex-wrap gap-2 justify-center h-[85%] p-2 bg-teal-50">
        {tasks
          ?.filter((task) => new Date(task.endDate).toDateString() === new Date(date).toDateString())
          .map((task, index) => (
            <Link to={`/todos/details/${task._id}`} key={index} className="task-link w-full" onClick={()=>{
              localStorage.setItem( "ComeFrom", "/todos/calendar")
            }}>
              <div
                style={{ backgroundColor: colors[task.priority], opacity: 0.85 }}
                className="task-of-day cursor-pointer inline-block p-2 border-[1px] drop-shadow-lg rounded-3xl text-xs text-white font-semibold"
              >
                {task.taskName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
