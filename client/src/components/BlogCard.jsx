import React from 'react'
import {Link} from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <Link to={`/blog/${blog._id}`} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300'>
        <img src={blog.image} alt="" className='aspect-video' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-b-full text-primary text-sm'>{blog.category}</span>
        <div className='p-5'>
            <h5 className='mb-2 font-medium text-gray-900'>{blog.title}</h5>
            <p className='mb-3 text-sm text-gray-600' dangerouslySetInnerHTML={{"__html": blog.description.slice(0,80)}}></p>
        </div>
    </Link>
  )
}

export default BlogCard