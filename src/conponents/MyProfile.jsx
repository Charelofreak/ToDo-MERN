import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../Reducer';
import profile from '../imgs/profile.avif';
import { user } from '../Reducer';
import { Link } from 'react-router-dom';
import { useData } from '../ContextProvider';
export default function MyProfile() {
    const [profileS, setProfile] = useState({ name: "", email: '', association: '' ,ImageProfile : null });
    const [profilUpdate, setProfileUpdate] = useState({ name: "", email: '', association: '' , ImageProfile  : null });
   const [file , setFile] = useState("")
    const [isInChangeState , setChangeState] = useState(false)
    const [ , dispatch ] = useData()

    const getImageSrc = () => {
        if (profileS?.ImageProfile?.imageBase64) {
            return  `data:${profileS?.ImageProfile?.mimeType};base64,${profileS?.ImageProfile?.imageBase64}`;
        }
    };
    async function updateProfile(){
              const form = new FormData()
              form.append("name" , profilUpdate.name)
              form.append("email" , profilUpdate.email)
              form.append("association" , profilUpdate.association)
              form.append("profile" , file)
           return fetch('/todos/MyProfile/'+user().user ,{
            method : "PATCH" , 
            headers :{
                "auth" : user().login
            },
            body : form
           })
   }

    useEffect(() => {
        fetchProfile(dispatch ,(data)=>{
            setProfile({ ...data });
        } );
    }, [isInChangeState]);
    console.log( "mimeType",profileS?.ImageProfile?.mimeType)
    return (
        <div className='w-full h-screen grid place-content-center bg-gradient-to-l from-blue-300 to-red-400'>
            <div className='profile p-3 flex flex-col md:flex-row gap-3 rounded-lg w-[90vw] md:w-[60vw] h-[90vh] md:h-[70vh] bg-gradient-to-bl from-blue-900 to-green-600 shadow-lg shadow-black'>
               {
                !isInChangeState &&    <>
                 <div className='picPart h-full w-full md:w-[40%] p-2 rounded-lg bg-[black]'>
                    <img src={getImageSrc()} style={{ boxShadow: '0 0 3px white , 0 0 30px lightblue' }} alt="" className='w-[30vw] md:w-[12vw] mx-auto mt-5 shadow-white h-[30vw] md:h-[12vw] rounded-full object-cover' />
                    <span className='gradient-text text-3xl capitalize mx-auto mt-4 block w-[80%] md:w-[60%] text-center'>{profileS.name}</span>
                    <span className='text-md text-gray bg-transparent border-[1px] rounded-xl p-2 block w-max mt-9 mx-auto capitalize cursor-pointer hover:text-fuchsia-700 hover:bg-fuchsia-700/10 text-fuchsia-700'
                      onClick={
                           ()=>{
                            setProfileUpdate({...profileS , ImageProfile : getImageSrc()})
                            setChangeState( t => true)
                           }
                      }
                    >
                        change your profile
                    </span>
                </div>
                <div className='details h-full w-full md:w-[60%] rounded-lg p-2  bg-[black]'>
                    <div className='w-max text-4xl capitalize gradient-text mx-auto mt-6'>profile details</div>
                    <div className="info w-[90%] h-[80%] mx-auto mt-[10%] md:mt-[17%] rounded-xl">
                        <div className='text-white capitalize text-xl w-full mt-10 ml-5'>name :<span className='ml-2 text-slate-300 text-lg'>{profileS.name}</span></div>
                        <div className='text-white capitalize text-xl w-full mt-2 ml-5'>email : <span className='ml-2 text-slate-300 text-lg'>{profileS.email}</span></div>
                        <div className='text-white capitalize text-xl w-full mt-2 ml-5'>association :<span className='ml-2 text-slate-300 text-lg'>{profileS.association}</span></div>
                    </div>
                </div>
                
                </>
                
               }
               {
                isInChangeState && <>
                      <div className='w-[60%] 
                      h-full bg-green rounded-lg
                       flex flex-col items-center
                       justify-center gap-2 bg-black/50'>
                         <span className='mx-auto mb-4 text-4xl gradient-text block'> update your info </span>
                          <div  className=' w-[60%] '>

                              <span  className='text-white block capitalize text-xl ml-3 w-max'>name</span>
                              <input 
                              value={profilUpdate.name}
                              onChange={(e)=>{
                                setProfileUpdate({ ...profilUpdate , name : e.target.value})
                            }}
                              type="text" 
                              className='w-full  p-2 
                                border-2  rounded-xl border-white 
                                bg-transparent outline-none text-white
                                 placeholder:text-white  placeholder:absolute  placeholder:left-6
                                ' 
                     
                                />
                          </div>
                          <div  className=' w-[60%] '>
                              <span  className='  text-white block capitalize text-xl ml-3 w-max'>email</span>
                              <input 
                               value={profilUpdate.email}
                               onChange={(e)=>{
                                   setProfileUpdate({ ...profilUpdate , email : e.target.value})
                               }}
                              type="text" 
                              className='w-full  p-2 
                                border-2  rounded-xl border-white  text-white
                                bg-transparent outline-none 
                                 placeholder:text-white  placeholder:absolute  placeholder:left-6
                                ' 
                        
                                />
                          </div>
                          <div  className=' w-[60%] '>
                              <span  className='text-white block capitalize text-xl ml-3 w-max'>association</span>
                              <input 
                               value={profilUpdate.association}
                               onChange={(e)=>{
                                setProfileUpdate({ ...profilUpdate , association : e.target.value})
                            }}
                              type="text" 
                              className='w-full  p-2  text-white
                                border-2  rounded-xl border-white 
                                bg-transparent outline-none 
                                 placeholder:text-white  placeholder:absolute  placeholder:left-6
                                ' 
                                />
                          </div>
                       <div className='w-max flex gap-9 mx-auto mt-5'>
                       <span 
                       className='
                        w-max 
                        border-white rounded-xl  border-2
                         py-2 px-6 cursor-pointer text-xl text-white'

                         onClick={  async ()=>{
                            const res = await updateProfile()
                               if (res.ok){
                                    setChangeState( t => false)
                               }
                         }}
                       >save</span>
                       <span 
                       className='
                        w-max 
                        border-white rounded-xl  border-2
                         py-2 px-6 cursor-pointer text-xl text-white'
                         onClick={()=>{
                            setChangeState  ( t => false)
                         }}
                       >cancel</span>
                       </div>
                      </div>
                      <div className='imageProfile w-[40%] h-full bg-black/50 rounded-xl'>
                      <img src={profilUpdate.ImageProfile} style={{ boxShadow: '0 0 3px white , 0 0 30px lightblue' }} alt="" className='w-[30vw] md:w-[12vw] mx-auto mt-5 shadow-white h-[30vw] md:h-[12vw] rounded-full object-cover' />
                            <label htmlFor="imgUp" className='w-max 
                        border-white rounded-xl  border-2
                         py-1 px-3 cursor-pointer text-xl block mx-auto mt-12  text-white' >change image</label>
                         <input type="file" hidden  id='imgUp' onChange={(e)=>{
                            setFile(e.target.files[0])
                             const file = new FileReader()
                                    file.onloadend = ()=>{
                                    setProfileUpdate({...profilUpdate , ImageProfile : file.result})
                                     
                                }
                                    file.readAsDataURL(e.target.files[0])
                                   
                                 
                         }}/>
                      </div>
                       
                </>

               }
            </div>
            <Link to={'/todos'} className='px-3 py-2 border-2 bg-transparent rounded-xl text-gray-200 absolute left-1 top-1'>back</Link>
        </div>
    );
}
