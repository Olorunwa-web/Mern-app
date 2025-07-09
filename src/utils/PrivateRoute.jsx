import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'

const PrivateRoute = ({children}) => {
    const {user, isLoading} = useContext(AuthContext)

    if (isLoading){
        return <div className = 'min-h-screen flex justify-center items-center bg-[#FFFFFF] '><PropagateLoader color= '#3439CA' loading= {true} size = {20} /></div>
    }
  return user ? children : <Navigate to="/auth/sign-in"/>
    
  
}

export default PrivateRoute
