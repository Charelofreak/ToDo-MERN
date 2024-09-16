import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <div   className='footer' style={{height :"20vh" , alignItems :"flex-end"}}>
      
      &copy; copy right NM team  { new Date().getFullYear()}
    </div>
  )
}
