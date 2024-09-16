import "./Todos.css";
import TodoSection from "../conponents/TodoSection";
import NavBar from "../conponents/NavBar";
import { useEffect, useState  , useRef, useContext} from "react";
import Search from "../conponents/Search";
import NavSetting from "../conponents/NavSetting";
import { Link } from "react-router-dom";

import { useUser } from "../UserContext";
import { user } from "../Reducer";
import { Navigate } from "react-router-dom";
import { createContext } from "react";

const CONTEXT  =  createContext()

export default function Todos() {
  const [pagesRender, setPagesRender] = useState(false)
 
  const [current , setCurrent] = useState('inbox')
  const [render , setRender] = useState(false)
  const [data , dispatch] = useUser()
useEffect(()=>{
  dispatch({type : "LOGIN" , payload : JSON.parse(sessionStorage.getItem('user'))})
    sessionStorage.setItem("active" , "inbox")  ; 

},[])


  console.log(" render" , pagesRender)
  return (
  <>
    <div className="todos flex bg-white ">
      <div className="section w-full  z-0">
        <TodoSection current={current} update={render} user={data.login}></TodoSection>
       
      </div>
      <div className="navbar relative   w-[max-content]  shadow-sm shadow-black ">
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" 
      className="absolute bottom-0 z-0">
        <path

          fill="green"
          fillOpacity={1}
          d="M0,192L40,165.3C80,139,160,85,240,96C320,107,400,181,480,
          186.7C560,192,640,128,720,101.3C800,75,880,85,960,117.3C1040,
          149,1120,203,1200,186.7C1280,171,1360,85,1400,42.7L1440,0L1440,
          320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,
          320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,
          320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </div>
  
  </>
  );
}
export const useTodos = () => useContext(CONTEXT)