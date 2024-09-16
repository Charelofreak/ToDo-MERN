import { useCallback } from 'react';
import { useData } from '../ContextProvider';
import { UpdateTodo } from '../Reducer';
import React from 'react'
import { user } from '../Reducer';
export default function Btns({type , Task}) {
    const [data , dispatch] = useData()
  const btn= useCallback((type , Task) => {
  
    switch (type) {
      case 0:
        return (
          <span
            className="rounded bg-green-300 py-1 px-2 cursor-pointer hover:bg-green-300/50"
            onClick={async () => {
              try {
                dispatch({ type: "LOADING_ON" });
                const res = await UpdateTodo({ ...Task, status: 1 });
                if (res.ok) {
                  dispatch({ type: "LOADING_OFF" });
                }
              } catch (e) {
                console.log(e);
              }
            }}
          >
            start
          </span>
        );
      case 1:
        return (
          <>
            <span
              className="rounded bg-green-300 py-1 px-2 cursor-pointer hover:bg-green-300/50"
              onClick={async () => {
                try {
                  dispatch({ type: "LOADING_ON" });
                  const res = await UpdateTodo({ ...Task, status: 2 });
                  if (res.ok) {
                    dispatch({ type: "LOADING_OFF" });
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              finish
            </span>
            <span
              className="rounded bg-green-300 py-1 px-2 cursor-pointer hover:bg-green-300/50"
              onClick={async () => {
                try {
                  dispatch({ type: "LOADING_ON" });
                  const res = await UpdateTodo({ ...Task, status: 0 });
                  if (res.ok) {
                    dispatch({ type: "LOADING_OFF" });
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              pause
            </span>
          </>
        );
      case 2:
        return (
          <>
            <span
              className="rounded bg-green-300 py-1 px-2 cursor-pointer hover:bg-green-300/50"
              onClick={async () => {
                try {
                  dispatch({ type: "LOADING_ON" });
                  const res = await UpdateTodo({ ...Task, status: 1 });
                  if (res.ok) {
                    dispatch({ type: "LOADING_OFF" });
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              refuse
            </span>
            <span
              style={{ display: user().user === Task.admin ? 'inline' : 'none' }}
              className="rounded bg-green-300 py-1 px-2 cursor-pointer hover:bg-green-300/50"
              onClick={async () => {
                try {
                  dispatch({ type: "LOADING_ON" });
                  const res = await UpdateTodo({ ...Task, status: 3 });
                  if (res.ok) {
                    dispatch({ type: "LOADING_OFF" });
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              confirm
            </span>
          </>
        );
      default:
        return null;
    }
  }, []);
  
  return (
    <>
    {
      btn(type , Task)
    }
    </>
  )
}

