import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const { token } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className='container mx-auto px-3 flex items-center justify-between py-5 cursor-pointer '>
      <Link to={'/'}>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
      </Link>
      <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 text-sm rounded-full cursor-pointer bg-primary text-white px-10 py-2.5 sm:py-3'>
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar