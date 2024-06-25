import React from 'react'
import toast from 'react-hot-toast'
import { useUserContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";

const SignInGoogle = () => {
    const navigate = useNavigate()
    const { googleSignIn } = useUserContext()
    const handleSignGoogle = async () => {
        try {
            await googleSignIn()
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <button type='button' onClick={handleSignGoogle} className='w-[100%] flex items-center justify-center gap-4'><FaGoogle /> Google Sign In</button>
    )
}

export default SignInGoogle