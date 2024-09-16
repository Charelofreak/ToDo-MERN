import React, { useEffect, useState } from 'react';
import { useData } from '../ContextProvider';
import TodoDetails from './TodoDetails';
import { deleteTask } from '../Reducer';
import Draggable from 'react-draggable';
export default function Search({ handleSearch, searchStatus, render }) {
  const [data, dispatch] = useData();
  const [searchRender, setSearchRender] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SEARCH_TODO' });
  }, [dispatch, searchRender]);

  return (
    <Draggable handle=".handle">
      <div
        className={`${
          searchStatus ? 'block' : 'hidden'
        } z-50 shadow-lg w-[80vw] h-[70vh] p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden`}
      >
        <div className="handle cursor-move p-2 flex justify-between items-center bg-gray-200 rounded-t-lg">
          <div className="text-xl font-bold">Search Tasks</div>
          <button
            className="p-2 rounded-full hover:bg-gray-300"
            onClick={() => handleSearch()}
          >
          <i>X</i>
          </button>
        </div>
        <input
          className="w-full h-10 border-b-2 border-gray-200 outline-none text-lg px-2 my-2"
          type="text"
          name="search"
          id="search"
          placeholder="Search tasks..."
          onChange={(e) => {
            dispatch({ type: 'SEARCH_TODO', inputVal: e.target.value });
          }}
        />
        <div className="h-px bg-gray-200"></div>
        <div className="content w-full h-[calc(70vh - 140px)] overflow-y-auto">
         {
          data.loading && <>
          
          </>
         }
         {
           !data.loading && <>
           {data.search.length ? (
            data.search.map((task, index) => (
              <TodoDetails
                render={render}
                search={setSearchRender}
                type={parseInt(task?.status)}
                key={index}
                deleted={deleteTask}
                task={task}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-lg text-gray-500">No tasks found :(</span>
            </div>
          )}
           
           </>
         }
        </div>
      </div>
    </Draggable>
  );
}
