import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { backendUrl } = useAppContext();

  const fetchBlogs = async () => {
    let response = await axios.get(`${backendUrl}/api/blog/all-blogs`, { withCredentials: true })
    if (response.data) {
      setBlogs(response.data);
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/blog/delete/${blogId}`, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.messege)
        await fetchBlogs();
      }
    } catch (error) {
      toast.error(error.response.data.messege);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{blogs.length}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-light uppercase'>
              <tr className=''>
                <th scope='col' className='px-2 py-4 l:px-6 text-start'>Blog</th>
                <th scope='col' className='px-2 py-4 text-start'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden text-start'>Date</th>
                <th scope='col' className='px-2 py-4 text-start'>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.slice(length - 6).reverse().map((blog, index) => (
                <tr key={index} className='border-y border-gray-300'>
                  <th className='px-2 py-4'>
                    <img className='h-8 w-14' src={blog.image} alt="" />
                  </th>
                  <td className='px-2 py-4'>{blog.title}</td>
                  <td className='px-2 py-4 max-sm:hidden'>{new Date(blog.createdAt).toDateString()}</td>
                  {/* <td className='px-2 py-4 max-sm:hidden'>
                                        <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
                                    </td> */}
                  <td className='px-2 py-4 flex text-sm gap-3'>
                    {/* <button className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button> */}
                    <img src={assets.cross_icon} onClick={() => deleteBlog(blog._id)} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard