import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useRef } from 'react';
import {UpdateTodo, getAvailableUser, user} from '../Reducer'
import { useData } from '../ContextProvider';
import socket from '../socket';
const CardDetails = () => {
  const [data , dispatch] = useData()
  const [allUsers , setAllUsers] = useState([])
  const [task , setTask] = useState({})
  const [ selectedUsers , setSelectedUser] = useState([])
  const [edite  , toedite] = useState(false)
  const save = useRef()
 const [Admin , setAdmin] = useState(false); 
  const exit = useRef(null)
  const select = useRef(null)
  const [refrech , setRefrech] = useState(true)
  const color = [ "red" ,"yellow" ,"blue"]
  useEffect(()=>{
       let  getOneTask = async()=> {
        const res  = await fetch('/todos/details/'+window.location.href.split('/')[window.location.href.split('/').length-1]
        , {
         headers :{
          "auth" : user().login
         }
        }
      )
      const d = await res.json()
      if(res.ok){
         const {task} = d 
        setTask({...task , endDate : task.endDate.split("T")[0]})
        setSelectedUser(task?.users)
     setAdmin({...Admin , isAdmin : user().user == task.admin})
              }
       }
       getOneTask()
  },[refrech])
  useEffect(() => {
    const fetchAvailableUsers = async () => {
      await getAvailableUser(dispatch, setAllUsers);
      setAllUsers(prevUsers => prevUsers.filter(e => selectedUsers.every(t => t._id !== e._id)));
    };
    fetchAvailableUsers();
  }, [dispatch, selectedUsers]);

  return (
    <div className='w-screen h-screen bg-gradient-to-bl from-green-900 to-green-100 grid place-content-center'>
      {
        !edite && 
          <div className='w-[50vw] h-[80vh] bg-white rounded-2xl shadow-2xl p-6 relative'>

        <h1 className='font-semibold capitalize text-center text-4xl text-indigo-700'>
          Task Details
        </h1>
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800'>Task Name</h3>
        <p className='text-md mt-1 text-gray-600 ml-2'>{task.taskName}</p>
        
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800'>Description</h3>
        <p className='text-md mt-1 text-gray-600 ml-2 break-words'>
          {task.desc}
        </p>
        
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800'>Due Date</h3>
        <p className='text-md mt-1 text-gray-600 ml-2'>{task.endDate?.split("T")[0]}</p>
        
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800'>Group Working On</h3>
        <div className='flex gap-2 mt-2 flex-wrap'>
          
          { task.users?.map((user, index) => (
            <span key={index} className='flex items-center bg-green-200 text-green-800 px-3 py-1 rounded-full'>
              {user.name} <span className='cursor-pointer ml-2 text-red-500'></span>
            </span>
            
          ))}
        </div>

        <div className='absolute top-20 right-10'>
          <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill={color[task.priority]}
              d="M8 0c-4.40625 0-8 3.59375-8 8s3.59375 8 8 8 8-3.59375 8-8-3.59375-8-8-8zm1 3v6c0 .550781-.449219 1-1 1s-1-.449219-1-1V3zm-1 8c.550781 0 1 .449219 1 1s-.449219 1-1 1-1-.449219-1-1 .449219-1 1-1z"
            />
          </svg>
        </div>
        <div className=' cursor-pointer p-2 bg-red-100 w-[40px] h-[40px] absolute grid place-content-center rounded-xl top-2 right-2 ' onClick={()=>{
          exit.current?.click()
        }}>

      <i className="fa-solid fa-xmark"></i>
     
      </div>
      {
        Admin.isAdmin && <span className='bg-blue-500 cursor-pointer w-max h-max mt-10 text-white rounded-xl px-10 capitalize text-xl py-2 mx-auto block'
        onClick={()=>{
          toedite( t => true)
        }}
        
        ><i className=" mr-2 text-white fa-solid fa-pen"></i> edit </span>
      }
      </div>
        }
      {
        edite && <div className='w-[50vw] h-[80vh] grid grid-cols-6  grid-rows-12 bg-white rounded-2xl shadow-2xl p-6 relative'>

        <h1 className='font-semibold capitalize text-center col-span-6 row-span-1 text-4xl text-indigo-700'>
          Task update
        </h1>
        <h3 className='text-lg mt-4 capitalize  flex items-center 
        col-span-3 row-span-1 w-full  font-medium text-gray-800'>Task Name</h3>
        <h3 className='text-lg mt-4 grid place-content-center  capitalize col-span-3 
        row-span-1 w-full  font-medium
         text-gray-800'>Priotity</h3>

        <input className='w-full outline-none border-[2px] border-black rounded-xl p-2 col-span-3 row-span-1 h-[100%]' type="text" 
          value={task.taskName} onChange={(e)=>{
            setTask({...task , taskName : e.target.value })
          }}
        />
        <div className=' justify-center w-full p-2 col-span-3 items-center   row-span-1 flex gap-10  h-[100%] '>
          <select name="selected_User" className='outline-none' id="users" 
           onChange={(e)=>{
            setTask({...task , priority : e.target.value})
           }}
          
          >
            <option value="0" selected={task.priority == 0} key="0">High</option>
            <option value="1" selected={task.priority == 1} key="1">Medium</option>
            <option value="2" selected={task.priority == 2} key="2">Low</option>
          </select>
          <svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill={color[task.priority]}
              d="M8 0c-4.40625 0-8 3.59375-8 8s3.59375 8 8 8 8-3.59375 8-8-3.59375-8-8-8zm1 3v6c0 .550781-.449219 1-1 1s-1-.449219-1-1V3zm-1 8c.550781 0 1 .449219 1 1s-.449219 1-1 1-1-.449219-1-1 .449219-1 1-1z"
            />
          </svg>
        </div>
        
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800 col-span-6 row-span-1 w-full'>Description</h3>
        <textarea name="desc" id="desc"  cols="30" rows="10" className='text-md mt-1 
        resize-none text-gray-600 ml-2 break-words  rounded-xl
         outline-none border-[2px] border-black
         col-span-6 row-span-2 h-full' 
         value={task.desc} 
         onChange={(e)=>{
          setTask({...task , desc : e.target.value })
        }}
         
         />
        
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800 col-span-3 row-span-1'>Due Date</h3>
        <h3 className='text-lg mt-4 capitalize font-medium text-gray-800 col-span-3 row-span-1 flex justify-center '>select User</h3>

        <input className='text-md mt-1  text-gray-600 ml-2 col-span-3 outline-none
          rounded-xl border-2 border-black row-span-1 h-full'  type='date' 
          value={task.endDate} onChange={(e)=>{
            setTask({...task , endDate : e.target.value })
          }}
          
          />
          <select ref={select} name="users" id="users" className='text-md mt-1  text-gray-600 ml-2 col-span-3 outline-none
          rounded-xl  row-span-1 h-full w-[60%] place-self-center'
          onChange={ (t)=>{
            setSelectedUser(e=> [...e , ...allUsers.filter( e=> e._id === t.target.value)])
       setTimeout(() => {
        select.current.value = "default" ;
       }, 0);
            
          }}
          
          
          >
            <option key={'default'} selected={true} value={"default"}> select one </option>
          {
            allUsers.map((e,i) =>{
              return   (
                <option key={i} value={e._id} 
                 >{e.name}</option>
              )
            })
          }
          </select>
        
        <h3 className='text-lg capitalize font-medium text-gray-800 col-span-6 row-span-1 mt-3'>Group Working On</h3>
        <div className='flex gap-2  flex-wrap col-span-4 row-span-1'>
          {selectedUsers.map((user, index) => (
            <span key={index} className='flex items-center bg-green-200 text-green-800 px-3 py-1 rounded-full'>
              {user.name} <span className='cursor-pointer ml-2 text-red-500' 
               onClick={()=>{
                  setSelectedUser( e => [...e.filter( t => t._id !== user._id)])
   
               }}
              >x</span>
            </span>
          ))}
        </div>

       
        <div className=' cursor-pointer p-2 bg-red-100 w-[40px] h-[40px] absolute grid place-content-center rounded-xl top-2 right-2 ' onClick={()=>{
           exit.current && exit.current.click()
         
        }}>

      <i className="fa-solid fa-xmark"></i>
      </div>
      
        <span ref={save} className='bg-blue-500 cursor-pointer w-max h-max mt-10
         text-white rounded-xl col-span-3 row-span-1 px-10 capitalize text-xl py-2 mx-auto
          block' 

          onClick={
            
            async()=>{
             const res = await UpdateTodo( {...task  , users : [...selectedUsers]})
             save.current.innerHTML = "updating ..."
             if (res.ok){
              console.log( "old" , task.users)
              console.log( "new" ,selectedUsers)
              socket.emit("updateTask" ,  JSON.stringify({oldUsers : task.users , admin : user().user  , id : task._id }))
              save.current.innerHTML  = "update successful"
                setTimeout(() => {
                    toedite ( t => false)
                    setRefrech( t => !t )
                }, 800); 
                
             }
            }
          }> save </span>
          <span className='bg-red-500 cursor-pointer w-max h-max mt-10
         text-white rounded-xl col-span-3 row-span-1 px-10 capitalize text-xl py-2 mx-auto
          block'
          onClick={()=>{
            toedite(t => false)
          }}
          
          > back </span>
      
      </div>
      }
       <Link ref={exit}  to={localStorage.getItem("ComeFrom")} className='hidden'></Link>
    </div>
  );
}

export default CardDetails;
