import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"

interface prop{
  children?:ReactElement,
  isAdmin?:boolean,
  adminOnly?:boolean,
  redirect?:string,
  isAuthenticated:boolean
}

const ProtectedRoute = ({isAuthenticated,children,adminOnly,redirect='/ ',isAdmin}:prop) => {

  if(!isAuthenticated) return <Navigate to={redirect}/>;
  

  if(adminOnly&& !isAdmin){
   return  <Navigate to={redirect}/>
  } 
  return (
   children?children:<Outlet/>
  )
}

export default ProtectedRoute