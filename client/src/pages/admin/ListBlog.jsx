import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const ListBlog = () => {
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
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl16 bg-blue-50/50'>
      <h1>All Blogs</h1>
      <div className='relative max-h-[70vh] mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
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
            {blogs?.reverse().map((blog, index) => (
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
  )
}

export default ListBlog