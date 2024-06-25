import React from 'react'
import { useUserContext } from '../context/AuthProvider'
import { FaSignOutAlt } from "react-icons/fa";


const SignOut = () => {
    
    const {signUserOut} = useUserContext()

    const handleLogOut = async()=>{
  
        try {
          
         await signUserOut() 
         
        } catch (error) {
         toast.error(error.message)
        } 
     
     }

  return (
    <button className='icon' onClick={handleLogOut}>< FaSignOutAlt className='w-[1.25em]'/></button>
  )
}

export default SignOut