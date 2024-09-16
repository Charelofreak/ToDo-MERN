import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAvailableUser } from '../Reducer';
import { useData } from '../ContextProvider';
import { Link, Navigate } from 'react-router-dom';

const CreateTodo = () => {
  const [data, dispatch] = useData();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const back = useRef(null)
  const [Task , setTask] =useState({ taskName : '' , endDate : "" , priority : 0 , desc : '' , users : []})
  const [error, setError] = useState('');
  const userSelectRef = useRef(null);
  useEffect(() => {
      getAvailableUser(dispatch, setAllUsers);

  }, [dispatch]);
  console.log(allUsers)
useEffect(()=>{
  setTask({...Task , users : selectedUsers})
},[selectedUsers.length])
  const handleAddUser = () => {
    const selectedUserId = userSelectRef.current.value;
    if (selectedUserId !== 'default') {
      const selectedUser = allUsers.find(user => user._id === selectedUserId);
      setSelectedUsers(prev => [...prev, selectedUser]);
      setAllUsers(prev => prev.filter(user => user._id !== selectedUserId));
      setTask({...Task , users : selectedUser }); 
    } else {
      setError('You should choose one before :)');
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleRemoveUser = (userId) => {
    const removedUser = selectedUsers.find(user => user._id === userId);
    setAllUsers(prev => [...prev, removedUser]);
    setSelectedUsers(prev => prev.filter(user => user._id !== userId));
  };

  const pevent = "rounded-md w-full p-3 ";




  return (
    
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
      <span  className=' absolute right-1 top-1 p-3 rounded-md   bg-green-400  '><Link ref={back} to={'/todos'}>back</Link></span>
        <h2 className="text-2xl font-bold mb-4">Create task</h2>

        <div className="mb-4 relative">
          <input
            className={pevent}
            value={Task.taskName}
            type="text"
            id="Tname"
            placeholder="Task Name"
            onChange={(e) => setTask({ ...Task, taskName: e.target.value })}
          />
          <label
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            htmlFor="Tname"
          >
          </label>
        </div>

        <div className="mb-4">
        <label className="block mb-2">Priority:</label>
          <select
            className="rounded-md w-full p-3"
            name="priority"
            id="priority"
            value={Task.priority}
            onChange={(e) => setTask({ ...Task, priority: e.target.value })}
          >
            <option value="0">High</option>
            <option value="1">Medium</option>
            <option value="2">Low</option>
          </select>
        </div>

        <div className="mb-4 relative">
          <textarea
            value={Task.desc}
            className="resize-none rounded-md w-full p-3"
            id="desc"
            placeholder="Description"
            onChange={(e) => setTask({ ...Task, desc: e.target.value })}
          />
          <label
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            htmlFor="desc"
          >
          </label>
        </div>

        <div className="mb-4 relative">
        <label className="block mb-2">Deadline:</label>
          <input
          
            className={pevent}
            value={Task.endDate.split('T')[0] || ''}
            type="date"
            id="delay"
            placeholder="Delay"
            onChange={(e) => setTask({ ...Task, endDate: e.target.value })}
          />
          <label
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            htmlFor="delay"
          >
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <select ref={userSelectRef} className="rounded-md p-3 w-full" name="user" id="user">
            <option value="default">Select one</option>
            {allUsers.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          <button
            className="ml-4 bg-blue-600 text-white p-3 rounded-md"
            onClick={()=>{
              handleAddUser() ;
            
            } }
            
          >
            Add
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block mb-2">Selected Users:</label>
          <div className='max-h-[100px] overflow-y-auto'>
            {selectedUsers.map(user => (
              <div key={user._id} className="flex justify-between items-center mb-2 p-2 bg-gray-200 rounded-md">
                <span>{user.name}</span>
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          className="w-full bg-green-500 text-white p-3 rounded-md"
          onClick={() => {
          
          if(Task.taskName !== "" && Task.endDate !== ""){
            console.log(Task.users)
            dispatch({type : "CREATE_TODO" , body : {...Task , users :Task.users.flat() }})
            setTimeout(()=>{
             back.current.click()
            } , 400)
          }
          else{
            setError("you can create task without name ")
          }
            
          }
           
          
          }
        >
          create
        </button>
      </div>
      
    </div>
    
   
   
  );
};

export default CreateTodo;
