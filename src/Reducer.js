import { useState } from "react";
import { useData } from "./ContextProvider";
import socket from "./socket";

       let CURRENT_MONTH  = new Date().getMonth()
 export let DATA ={
      task: []
      ,
      taskOfMonth :[]
       , 
       currentMonth  :  new Date().getMonth()
       , 
       calendar :  generateCalendar(CURRENT_MONTH)
       , 
       search : [] 
       , 

       loading : false ,
       groups : []
       ,user : null
       ,login : null
       , OldNotification : []
       ,
       profile : require('./imgs/profile.avif')
}
export const getAvailableUser = async (dispatch ,state )=> {
  dispatch({type : 'GET_USERS'})
const res = await fetch('/todos/users' ,
{
 method : "GET" , 
 headers : {
   "auth" : user().login
 }
})
const data = await res.json()
if(res.ok){
    dispatch({type : "USERS_SUCCESS"  })
    state && state(data)
   return data ;
   
}
}
 export const fetchProfile = async (dispatch , callBack ) => {
  const res = await fetch('/todos/MyProfile/' + user().user, {
      method : 'GET' ,
      headers: {
          'auth': user().login
      }
  });
    if (res.ok ){
      const data = await res.json();
       
         callBack &&  callBack(data) 
          dispatch({type : "GET_PHOTO_PROFILE" , payload : data.ImageProfile})  
        
    }
 
  
};






 export const deleteTask = async (task , deleted , search)=>{
 
  const response =  await fetch(
   '/todos/'+task._id
   ,{
     method : "DELETE"
     ,
     headers : {
       "content-type" : 'application/json',
       "auth" : user().login
     },
     body : ''
   }
   
  )
 if(response.ok){
  socket.emit("deleteTask" , JSON.stringify({u : user().user , task }))
   deleted( t=> !t)
   search &&  search( t => !t)
 }

    
 
  
}
  function nextMonth(){
      if(CURRENT_MONTH >= 11 ){
        CURRENT_MONTH = 0;
         
      }
      else{
        CURRENT_MONTH += 1
      }
      
  }
  
     export async function   UpdateTodo(todo){
      
     return fetch("/todos/"+todo._id,
     {
      method :"PATCH" ,
      body : JSON.stringify(todo),
      headers  : {
          "content-type":"application/json",
          "auth" : user().login
      }
     })
    
  }
  function prevMonth(){
    if(CURRENT_MONTH <= 0){
        CURRENT_MONTH = 11;
      }else{
        CURRENT_MONTH -= 1
      }
      
  }
  export  function user (){
   
     return{
      user : 
      JSON.parse(sessionStorage.getItem('user') )?.user || null
      , 
      login : JSON.parse(sessionStorage.getItem('user') )?.login || null
     }; 
  }

   export  async function getData(dispatch , id){
      dispatch({type : "GET_TODO"})   
      if( ! user().login){
          dispatch({type : "ERROR" , message : 'you should login before'}) 
          return
      }
      
      try{
      
        const res =  await fetch('/todos',
    {
        method : 'GET' ,
        headers: {
            "content-type" : 'application/json', 
            "auth" :  user().login
        }
    } )
     const cf =  await res.json()
        if(res.ok){
         
            dispatch({ type : "DATA_SUCCESS" , task : cf.tasks , OldNotification : cf.nt})
                 dispatch({type : 'GET_MONTH_TODOS'})
             }
           
         
        
      }
      catch (e){
     dispatch({ type : "DATA_ECHEC" , error : e})
      }
    
   

    
     
}
function generateCalendar(currentMonth) {
    var today = new Date();
    var currentYear = today.getFullYear();
    // Get the last day of the previous month
          
    var lastDayOfPrevMonth = new Date(currentYear, currentMonth,0);
    // Get the last day of the current month
    var lastDayOfCurrMonth = new Date(currentYear, currentMonth + 1, 0);
    var lastDayOfPrevMonth = new Date(currentYear, currentMonth , 0);
    var daysToDisplayFromPrevMonth = new Date(currentYear, currentMonth, 0);
    var currMonthDays = [];
    for (var i = 1; i <= lastDayOfCurrMonth.getDate(); i++) {
        currMonthDays.push(new Date(currentYear, currentMonth, i).toDateString("YYYY-MM-DD"));
    }
    var prevMonthDays=[];
    for (var i =  35 - currMonthDays.length ; i > 0; i--) {
        prevMonthDays.push(new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), lastDayOfPrevMonth.getDate() - i + 1 ).toDateString("YYYY-MM-DD"));
    }

    

   
    

    // Combine all days
    var allDays = prevMonthDays.concat(currMonthDays);
    return allDays;
}

async function   sendPost(todo , auth){
  try{
    const res =  await fetch("/todos/createTask",
   {
    method :"POST" ,
    body : JSON.stringify(todo),
    headers  : {
        "content-type" : "application/json", 
        "auth" : user().login
    }
   })
   if(res.ok) {
       console.log(socket)
      socket.emit("addTask" , user().user)
   }
  }
  catch(e){
    console.error(e.message)
  }
}


const  formatDate = (string)=> (string.length == 1) ?  ("0"+string) : string 
function matching(str1 , data) {

    let d = data.task
    .filter(e => new RegExp(`${str1}` ,"ig").test(e.taskName))  ;
  
    return d;
}
 export  function Reducer(data , action ) {
   switch(action.type){
    case 'SEARCH_TODO' :
        let sr =[];
        if(data?.task !== null){
           sr =  matching(action.inputVal , data)
        }
       return {...data , search : sr };
    case 'GET_MONTH_TODOS' :
          let   da = {...data , taskOfMonth : data?.task?.filter( (e) =>  data.calendar.indexOf(new Date(e.endDate).toDateString("YYYY-MM-DD")) !== -1 )    }
       return da ;
    
       case "NEXT_MONTH_CALENDAR" :
          nextMonth()
          data.currentMonth = CURRENT_MONTH
          data.calendar = generateCalendar(CURRENT_MONTH)
          action?.state()
       return data ;
       case "PREV_MONTH_CALENDAR" :
          prevMonth()
          data.currentMonth = CURRENT_MONTH
          data.calendar = generateCalendar(CURRENT_MONTH)
          action?.state()
       return data ;
       case "CREATE_TODO":
        sendPost(action.body)
       return data
       case "Update_TODO".toUpperCase():
        
       return data
       case "GET_USERS" :
           
       return {
         ... data , loading : true  
       } 
       case  'USERS_SUCCESS':
             data = {
               ...data 
               , loading : false
             }
            return data
       case "GET_TODO" :
           
        return {
          ... data , loading : true  
        } 
        case  'DATA_SUCCESS':
          console.log(action.OldNotification)
              data = {
                ...data , 
                task : action.task,
                OldNotification : action.OldNotification
                , loading : false , 
                search: action.task
              }
          
          return data
          case "LOADING_ON":
          
          return {
                   ...data , 
                   
                   loading : true 
                 }
                 case "LOADING_OFF":
          
                 return {
                          ...data , 
                          
                          loading : false 
                        }
         case "ERROR":
          
         return {
                  ...data , 
                  error : action.message  ,
                  loading : false 
                }
             case "GET_PHOTO_PROFILE"   : 
        
                 return {
                    ...data , 
                     profile :   `data:${action.payload.mimeType};base64,${action.payload.imageBase64}`
                 }
             

        default : 
        
        return data ;
   }
     

 }



