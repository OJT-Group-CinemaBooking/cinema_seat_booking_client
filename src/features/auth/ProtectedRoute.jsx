import React from 'react'
import { useSelector } from 'react-redux'
import { getRoles,getLoginStatus } from './authSlice'
import { Outlet,Navigate,useLocation } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles }) => {
    const status = useSelector(getLoginStatus)
    const roles = (useSelector(getRoles))
    const location = useLocation()

  return (
        status === 'success' ?
           roles.find(role => allowedRoles.includes(role)) ? 
           <Outlet />
           : <Navigate to='/user/unauthorized' state={{ from : location}} replace={true} />
        : <Navigate to='/login' state={{ from : location}} replace={true} />
  )
}

export default ProtectedRoute