import React, { useEffect, useReducer, useRef, useState } from "react";
import "./Section.css";
import gsap from "gsap";
import notification from "../imgs/notification.png";
import account from "../imgs/account.png";
import { Link } from "react-router-dom";
import { useData } from "../ContextProvider";
import { fetchProfile, getData, user } from "../Reducer";
import { useUser } from "../UserContext";
import TodoInBoard from "./TodoInBoard";
import TodoDetails from "./TodoDetails";
import Notification from "./Notification";
import NavSetting from "./NavSetting";
import Search from "./Search";
export default function TodoSection({ update }) {
  const [data, dispatch] = useData();
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "board"
  );
  const [render, setRender] = useState(false);
  const [notifica, setNotifica] = useState(0);
  const [current, setCurrent] = useState(0);
  const [searchStatus, setSearchStatus] = useState(false);
  const title = ["To Do", "Is Doing", "Done"];
  const notiRef = useRef(null);
  function HandleSearchStatus() {
    setSearchStatus((t) => !t);
  }

  useEffect(() => {
    getData(dispatch);
    fetchProfile(dispatch, null);
  }, [dispatch, update, user().login, render, notifica]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.classList.contains("notification")) {
        notiRef.current.hide();
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
        <Search handleSearch={HandleSearchStatus} searchStatus={searchStatus}  render={setRender}/>
        <NavSetting handleSearch={HandleSearchStatus} />
      <div className="head w-full h-[10vh] bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex justify-between items-center p-4">
        <svg width="max-content" height="100%" xmlns="http://www.w3.org/2000/svg">
          <text
            stroke="white"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="40"
            fill="transparent"
          >
            Manage Your Tasks
          </text>
        </svg>
        <div className="flex items-center">
          <div className="p-2 mr-10 bg-yellow-300 drop-shadow-sm rounded h-max w-max">
            <Link className="w-full h-full" to="createTask">
              Create Task
            </Link>
          </div>
          <div className="notification relative mr-10 w-6 h-6">
            <span className="absolute right-3 text-sm top-3 w-5 h-5 p-1 rounded-full bg-red-500 flex items-center justify-center">
              {notifica || data.OldNotification?.length}
            </span>
            <img
              className="w-full h-full cursor-pointer notification"
              src={notification}
              alt="Notification"
              onClick={() => {
                notiRef.current?.show();
              }}
            />
            <Notification ref={notiRef} refrech={setNotifica} />
          </div>
          <div className="account mr-10 w-6 h-6">
            <Link to={`/todos/MyProfile`}>
              <img
                className="w-full h-full scale-150 object-cover rounded-full"
                src={data.profile}
                alt="Profile"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5 w-full h-max"></div>
      <div className="view-mode flex w-max">
        <div
          className={`ml-10 rounded cursor-pointer drop-shadow-xl p-2 ${
            viewMode === "board" ? "bg-blue-400" : "bg-blue-300"
          }`}
          onClick={() => {
            localStorage.setItem("viewMode", "board");
            setViewMode("board");
          }}
        >
          Board View
        </div>
        <div
          className={`ml-1 rounded cursor-pointer drop-shadow-xl p-2 ${
            viewMode === "list" ? "bg-blue-400" : "bg-blue-300"
          }`}
          onClick={() => {
            localStorage.setItem("viewMode", "list");
            setViewMode("list");
          }}
        >
          List View
        </div>
      </div>
      <div className="w-full h-max flex">
        {viewMode === "board" && (
          <div className="data boardView w-full">
            <div className="w-full overflow-auto h-[79vh] flex mt-2 gap-2 justify-evenly">
              {["To Do", "Is Doing", "Done"].map((status, idx) => (
                <div
                  key={idx}
                  className="ml-2 px-3 rounded-lg flex flex-col justify-around gap-2 bg-blue-300 w-1/3 h-max max-h-full"
                >
                  <span
                    style={{ textShadow: "1px 1px 1px black, 2px 2px 2px gray" }}
                    className="capitalize grid place-content-center text-xl h-max p-1 text-white rounded-lg w-full"
                  >
                    {status.toLowerCase()}
                  </span>
                  <div className="todos-items w-full p-2 flex flex-col gap-3 overflow-y-auto todo-block">
                    {!data.loading && (
                      <>
                        {data.task.filter((e) => e.status == idx).length > 0 ? (
                          data.task
                            .filter((e) => e.status == idx)
                            .map((e, i) => (
                              <TodoInBoard
                                task={e}
                                render={setRender}
                                type={idx}
                                key={i}
                              />
                            ))
                        ) : (
                          <div className="w-full text-center text-3xl text-gray-200">
                            No task
                          </div>
                        )}
                      </>
                    )}
                    {data.loading && (
                      <div className="loading w-[5vw] h-[5vw] border-r-4 mx-auto border-blue-700 animate-spin rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {viewMode === "list" && (
          <div className="listView w-full flex h-[79vh]">
            <button
              className="my-auto bg-gray-300 ml-2 p-2 rounded-full uppercase"
              onClick={() => {
                if (current > 0) setCurrent((prev) => prev - 1);
              }}
            >
              Prev
            </button>
            <div className="w-11/12 mx-auto mt-2 h-[98%] bg-blue-200 rounded-xl">
              <span className="block mt-2 mx-auto text-center capitalize text-xl font-bold p-3">
                {title[current]}
              </span>
              <div className="w-11/12 mx-auto h-[85%] bg-green-100 rounded-xl flex flex-col gap-2 overflow-x-auto todo-block">
                {!data.loading && (
                  <>
                    {data.task
                      .filter((e) => e.status == current)
                      .map((t, i) => (
                        <TodoDetails key={i} task={t} render={setRender} type={current} />
                      ))}
                    {data.task.filter((e) => e.status == current).length === 0 && (
                      <div className="mx-auto mt-10 text-6xl text-gray-400 uppercase opacity-40">
                        No task
                      </div>
                    )}
                  </>
                )}
                {data.loading && (
                  <div className="loading w-[10vw] h-[10vw] border-r-4 mx-auto my-auto border-blue-700 animate-spin rounded-full"></div>
                )}
              </div>
            </div>
            <button
              className="my-auto bg-gray-300 mr-2 p-2 rounded-full uppercase"
              onClick={() => {
                if (current < 2) setCurrent((prev) => prev + 1);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
