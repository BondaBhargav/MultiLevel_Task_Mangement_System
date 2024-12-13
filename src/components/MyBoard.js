import React from 'react'
import { Outlet } from 'react-router-dom'

export const MyBoard = () => {
  return (
    <>
        <p className='border w-20 bg-success ps-3 bold'>MyTodoListBoard</p>
         <Outlet/>
    </>
  )
}
