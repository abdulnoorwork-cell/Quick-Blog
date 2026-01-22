import { v2 as cloudinary } from 'cloudinary';
import Blog from '../models/blog.model.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category } = req.body;
        if (!req.files) {
            return res.status(400).json({ success: false, messege: "image is required" })
        }
        const { image } = req.files;
        if (!title || !description || !category || !image) {
            return res.status(401).json({ success: false, messege: "Missing required fields" })
        }
        let allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"]
        if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({ success: false, messege: "Invalid Format! Only jpg, jpeg, png, webp are allowed" });
        }
        let cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath)
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error)
        }
        const blog = await Blog.create({ title, subTitle, description, category, image: cloudinaryResponse.url })
        res.status(201).json({ success: true, messege: "Blog added successfully", blog })
    } catch (error) {
        return res.status(500).json({ success: false, messege: "Error in add blog: " + error })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ success: false, messege: "Error in getting blogs: " + error })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({ success: false, messege: "Blog not found" })
        }
        res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ success: false, messege: "Error in getting single blog: " + error })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(400).json({ success: false, messege: "Blog not found" })
        }
        res.status(200).json({ success: true, messege: "Blog deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, messege: "Blog deleting error: " + error })
    }
}

export const updateBlog = async (req, res) => {
    try {
        if (req.body.image !== "") {
            const { blogId } = req.params;
            const { title, subTitle, description, category, } = req.body;
            if (title === "" || subTitle === "" || description === "" || category === "") {
                return res.status(400).json({ success: false, messege: "can,t be empty" })
            }
            const { image } = req.files;
            let allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
            if (!allowedFormats.includes(image.mimetype)) {
                return res.status(400).json({ success: false, messege: "Invalid format! Only jpg,png,jpeg,webp are allowed" })
            }
            let cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
                overwrite: true
            })
            if (!cloudinaryResponse) {
                console.log(cloudinaryResponse.error)
            }
            const blog = await Blog.findByIdAndUpdate(blogId, { title,subTitle, description,category, image: cloudinaryResponse.url }, { new: true });
            res.status(200).json({ success: true, messege: "Blog updated successfully", blog })
            return
        } else {
            const { blogId } = req.params;
            const { title, subTitle, description, category, } = req.body;
            if (title === "" || subTitle === "" || description === "" || category === "") {
                return res.status(400).json({ success: false, messege: "can,t be empty" })
            }
            const blog = await Blog.findByIdAndUpdate(blogId, { title,subTitle, description,category }, { new: true });
            res.status(200).json({ success: true, messege: "Blog updated successfully", blog })
        }
    } catch (error) {
        return res.status(500).json({ success: false, messege: "Blog update error: " + error })
    }
}