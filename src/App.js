import './App.css'
import { useEffect } from 'react';
import Todos from './views/Todos';
import Features from './views/Features';
import CreateTodo from './views/CreateTodo';
import Calendar from './conponents/Calendar';
import { Route , Routes , BrowserRouter as Router, Navigate } from 'react-router-dom';
import {ContextProvider} from './ContextProvider';
import { DATA, data , Reducer } from './Reducer';
import CreateGroupe from './views/CreateGroupe';
import Login from './views/Login';
import Signup from './views/Signup';
import UserContext from './UserContext';
import { user } from './Reducer';
import UpdateTodoModal from './conponents/UpdateTodoModel';
import socket from './socket';
import MyProfile from './conponents/MyProfile';
import Timer from './views/Timer';
import AboutUsing from './views/AboutUsing';
import Contact from './views/Contact';
function TodosRoute(){
       return(
        <>
        <Routes>
        <Route  path='/' element={<Todos></Todos>} />
         <Route  path='/calendar' element={<Calendar></Calendar>} />
         <Route  path='/timer' element={<Timer></Timer>} />
         <Route  path='/createTask' element={<CreateTodo></CreateTodo>} />
         <Route  path='/createGroupe' element={<CreateGroupe></CreateGroupe>} />
         <Route  path='/details/*' element={<UpdateTodoModal ></UpdateTodoModal>} />
         <Route  path='/MyProfile/*' element={<MyProfile ></MyProfile>} />
        </Routes>
         
        </>
       

       )
}

function App() {
  useEffect(()=>{
    socket.on("connect" , ()=>{
         console.log('connection ') 

    })
    socket.emit("newUser" ,user().user)
    socket.on("reconnect" ,  ()=>{
      socket.emit("newUser" ,user().user)
    })
  },[])

  return (
    <div className="App">
      <UserContext>
      <ContextProvider reducer={Reducer} data={DATA}>
        <Router>
           <Routes>
                <Route  path='/' element={<Features />} />
                <Route path='/about' element={<AboutUsing></AboutUsing>}/>
                <Route path='/contact' element={<Contact ></Contact>}/>
                <Route  path='/login' element={user().login === null ? < Login /> : <Navigate to={'/todos'} />}  />
                <Route  path='/signup' element={user().login === null ? < Signup /> : <Navigate to={'/todos'} />}  />
                <Route  path='/Todos/*' element={user().login !== null ? < TodosRoute /> : <Navigate to={'/login'} />} />
           </Routes>
        </Router>
          
      </ContextProvider>
      </UserContext>
    </div>
  );
}

export default App;
