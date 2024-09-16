import React, { useEffect, useRef } from 'react'
import './CreateGroupe.css'
import { useState } from 'react'
import {useData} from '../ContextProvider'
import { Link } from 'react-router-dom'
export default function CreateGroupe() {
  const [data , dispatch] = useData()
  const [checked , setChecked] = useState([])
  const [Allusers , setAllUsers] = useState([])
  const ref = useRef(null)
  const back = useRef(null)
  const [ error, setError] = useState("")
  const [ GroupeName, setGroupeName ] = useState("")
     
  return (
    <div className='relative w-[100vw] h-[100vh] flex justify-between  overflow-hidden items-center '>
         <div className='logo-Groupe w-full lg:w-[58vw]  order-2  absolute lg:relative  left-0 bottom-0 blur-md lg:blur-none '></div>
         
         {
          !data.loading && 
            <div className=' ml-[5vw] mr-[5vw] lg:ml-[3.5vw] lg:mr-[0]  form-Groupe-Create order-1  relative grid lg:w-[35vw] w-full h-[80vh]  grid-cols-6 grid-rows-7 gap-2 p-2'>
                        <h1 className='col-span-6 row-span-1 h-full w-full text-center uppercase font-semibold text-3xl'>add groupe</h1>
                <label className='  w-[80%] ml-5  h-[60%] uppercase  mt-3  grid  justify-end items-center   col-span-2 row-span-1' htmlFor="Gname">group name</label>
                <input value={GroupeName} className=' bg-transparent border-[0.8px]  border-black  w-[90%] p-3 h-[60%] mt-3   col-span-4 row-span-1 'placeholder='type group name' type="text" id='Gname' onChange={(e)=>{
                     setGroupeName(t => e.target.value)
                }}/>
                <span  className='error text-red-600 absolute left-[25%] top-[50px] '>{error}</span>
                <label className='  w-[80%] ml-5 h-[60%] uppercase   grid  justify-end items-center  col-span-2 row-span-1 ' htmlFor="Gname">users</label>

                <div className='   w-full flex gap-2  flex-wrap  h-full col-span-4 row-span-1' a type="text" id='Gusers'>
                   
                <select ref={ref} className= ' w-[50%] h-[60%]  bg-transparent  text-black p-2 uppercase' name="nab" id="id" >
                    <option className='text-sm'  value="default" key="0">select one</option>
                    {
                      Allusers.map(e =>{
                        return (
                        <option  className='text-sm'   value={e._id} key={e._id}>{e.name}</option>
                      )})
                    }
                   
                </select>
                <button className='  border-[0.5px] w-[38%] h-[60%] border-black hover:text-white grid place-content-center hover:bg-black   text-black p-2 uppercase' onClick={()=>{
                    if(ref.current.value !== 'default'){
                      setChecked(t => [...checked,   Allusers[ Allusers.findIndex(t => t._id === ref.current.value  )] ] )
                    setAllUsers(t =>[...t.filter(e=> e._id  !== ref.current.value)])
                    }
                    else{
                      setError(t => "you should choose one before :) " )
                      setTimeout(()=>{
                        setError(t =>'')
                      },4000)

                    }
                 
                    
                }}>add </button>
                </div>
                <div className='users-selected  w-[100%] col-span-6 row-span-3   flex  h-max max-h-full overflow-y-auto  justify-center items-start  flex-wrap'>
                    {
                        checked
                        .map((e,i,t) =>{
                        return  <span key={i} className='user  p-2 flex items-center w-[max-content] h-[max-content] m-1  justify-between  bg-green-200  '>
                        <span className='mr-2'>{e.name}</span>
                        <span className='p-1 cursor-pointer' onClick={()=>{
                             setAllUsers( t => [...Allusers , e])
                             setChecked( t => [...checked.filter(ee => ee._id !== e._id)])
                        }} >X</span>
               </span>  
                        })
                    }  
                    
                    

                    
                     
                </div>
               
                <input className=' bg-green-500 w-[40%] m-x-auto cursor-pointer h-[70%] col-span-6 row-span-1' type="submit" value='create' onClick={
()=>{
  if (GroupeName.length === 0  || checked.length===0){
    // detect errors and specific  the error
    if(GroupeName.length === 0){
      setError(t=> "you can't create a group without name!!")
    }
    else{
      setError(t=> "you should select  one before Create a Group")
    }
    setTimeout(()=>{
      setError(e => '')
    },2000)
  }
  else{
    let us = []
    checked.forEach(e => {
      us.push({id : e._id})
    })
   dispatch({type:"CREATE_GROUPE" ,data:{ groupeName : GroupeName , users : us}})
    back.current.click()
  }
}



                }/>
         </div>
          }
         {
          data.loading && <div>loading</div>
         }
         <div className="back absolute left-2 top-2" onClick={()=>{
          
         }}><Link ref={back} className='p-2 bg-green-300 rounded' to={'/todos'}>back</Link></div>
    </div>
  )
}
