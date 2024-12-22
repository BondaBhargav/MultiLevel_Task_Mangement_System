import React from 'react'
import { useGetproductsDataQuery, useLazyGetproductsDataQuery } from './components/Service/productApi'
import { Outlet } from 'react-router-dom'

const App = () => {


return(
  <>
  <h1 className='d-flex justify-content-center head '>Welcome To MY MutliLevel Task Management</h1>
  <Outlet/>
  </>

)
}
export default App