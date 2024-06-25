import React, { useRef } from 'react'
import { useUserContext } from '../context/AuthProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SignInGoogle from './SignInGoogle'
import GuestLogin from './GuestLogin'
import { FiLogIn } from "react-icons/fi";
import { IoPersonAdd } from "react-icons/io5";


const SignInSignUp = () => {

  const emailSignUpRef = useRef()
  const passwordSignUpRef = useRef()
  const emailSignInRef = useRef()
  const passwordSignInRef = useRef()

  const { signIn, signUp } = useUserContext()
  const navigate = useNavigate()

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    try {
      const signedUser = await signUp(emailSignUpRef.current.value, passwordSignUpRef.current.value)
      if (signedUser) {
        toast.success("User created successfully")

      }
      emailSignUpRef.current.value = ""
      passwordSignUpRef.current.value = ""
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault()
    try {
      const signedUser = await signIn(emailSignInRef.current.value, passwordSignInRef.current.value)
      if (signedUser) {
        toast.success("Signed In successfully")
        navigate("/")
      }
    } catch (error) {
      toast.error(error.message)
      // console.log(error)
    }
  }

  return (
    <section className='max-h-[100vh] px-5 py-4 flex justify-center  mt-5 flex-col items-center gap-10 ' >
      <h1 className='text-3xl font-semibold'>TypoTamer</h1>
      <div className='flex justify-center gap-[5rem] text-lg font-normal sm:flex-row flex-col'>

        <section className='flex flex-col justify-center items-start gap-5 max-w-[250px] w-[90%] '>
          <h2>register</h2>
          <form onSubmit={handleSignUpSubmit} className='flex flex-col gap-2 w-[100%]'>
            <input ref={emailSignUpRef} type="email" placeholder='email' />
            <input ref={passwordSignUpRef} type="password" placeholder='password' />

            <button type="submit" value="Sign Up" className='w-[100%] flex items-center justify-center gap-4'><IoPersonAdd />
              Sign Up</button>
          </form>
        </section>

        <section className=' max-w-[250px] w-[90%] flex flex-col justify-center items-start gap-5 '>

          <h2>login</h2>
          <div className='w-[100%]'>

            <form onSubmit={handleSignInSubmit} className='flex flex-col gap-2 w-[100%]'>
              <input ref={emailSignInRef} type="email" placeholder='email' className='' />
              <input ref={passwordSignInRef} type="password" placeholder='password' className='' />
              <button type='submit' value="Sign Up" className='w-[100%] flex items-center justify-center gap-4' ><FiLogIn />Sign In</button>
            </form>
          </div>
          <div className='flex flex-col justify-center items-center gap-2 w-[100%]'>
            <SignInGoogle />
            <GuestLogin />  
          </div>
        </section>


      </div> </section>
  )
}

export default SignInSignUp
