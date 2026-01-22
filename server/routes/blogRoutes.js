import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controllers/blog.controller.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post('/add', auth, addBlog);
router.get('/all-blogs', getAllBlogs);
router.get('/single-blog/:blogId', getSingleBlog);
router.delete('/delete/:blogId', auth, deleteBlog);
router.put('/update/:blogId', auth, updateBlog);

export default router;