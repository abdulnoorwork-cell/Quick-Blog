import React from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Login from './pages/admin/Login'
import 'quill/dist/quill.snow.css'
import { useAppContext } from './context/AppContext'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {

  const location = useLocation();
  const hideNavbar = ['/admin','/admin/addblog','/admin/listblog'];
  const hideFooter = ['/admin','/admin/addblog','/admin/listblog'];
  const { token } = useAppContext();

  return (
    <div>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:blogId' element={<Blog />} />
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path='listblog' element={<ListBlog />} />
        </Route>
      </Routes>
      <Toaster />
      {!hideFooter.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App