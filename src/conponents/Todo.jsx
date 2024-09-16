import React, { useImperativeHandle, useState } from 'react'
import './Todo.css'
import { useRef } from 'react'
import menuV from '../imgs/menuV.png'
import { useData } from '../ContextProvider'
export default function Todo({children , id ,CN ,render ,getId }) {
   const Ref = useRef(null)
   
   const [data , dispatch] = useData()
  return (
    <li ref={Ref} className={'todo-element '+CN} onClick={()=>{
      sessionStorage.setItem('active' , id)
                 getId(id)
                 render(t=> !t)
        
    }}>
        <span>{children}</span>
        
          
         
    </li>
  )
}
