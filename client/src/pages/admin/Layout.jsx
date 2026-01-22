import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import {useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Layout = () => {
  const navigate = useNavigate();
  const {setToken} = useAppContext();
  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/')
    toast.success('Logout successfull')
  }
  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/')} />
        <button onClick={logout} className='text-sm px-10 py-2.5 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout