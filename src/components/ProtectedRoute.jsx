import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useUserContext } from '../context/AuthProvider'

const ProtectedRoute = () => {
    
let {User} = useUserContext()
   
   return(
    User?<Outlet />:<Navigate to="/sign-up"/>
   )
}

export default ProtectedRoute;