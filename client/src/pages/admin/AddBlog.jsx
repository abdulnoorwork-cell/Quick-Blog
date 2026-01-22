import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import axios from 'axios';
import {useAppContext} from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const navigate = useNavigate()

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('')

  const { backendUrl, token } = useAppContext();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const formData= new FormData();
      formData.append('title', title);
      formData.append('subTitle', subTitle);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('image', image);
      
      const response =await axios.post(`${backendUrl}/api/blog/add`,formData,{
        headers: {
          Authorization: `${token}`
        }, withCredentials: true
      })
      if(response.data.success) {
        toast.success(response.data.messege);
        setLoading(false);
        setImage(false);
        setTitle('');
        setCategory('');
        setDescription('')
        setTimeout(()=>{
          navigate('/admin/listblog')
        },1000)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  const generateContent = async () => {

  }

  useEffect(()=>{
    if(!quillRef.current && editorRef.current) {
      quillRef.current === new Quill(editorRef.current,{theme: 'snow'})
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white flex flex-col w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' alt="" />
          <input type="file" onChange={(e)=> setImage(e.target.files[0])} id='image' />
        </label>
        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' required />
        <p className='mt-4'>Sub title (Optional)</p>
        <input type="text" placeholder='Type here' value={subTitle} onChange={(e)=>setSubTitle(e.target.value)} className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' />
        <p className='mt-4'>Blog Description</p>
        <div className='w-full relative'>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full mt-2 p-2 border border-gray-300 outline-none rounded h-52' required></textarea>
          {/* <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button> */}
        </div>
        <p className='mt-4'>Blog Category</p>
        <select onChange={(e)=> setCategory(e.target.value)} name="category" className='mt-2 w-fit px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item,index)=>(
            <option value={item} key={index}>{item}</option>
          ))}
        </select>
        <button type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer'>{loading ? 'Ading...' : 'Add Blog'}</button>
      </div>
    </form>
  )
}

export default AddBlog