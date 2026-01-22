import 'dotenv/config'
import jwt from 'jsonwebtoken';

export const adminLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({success: false, messege: "Can,t be empty"})
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({success: false, messege: "Invalid Credientials"})
        }
        const token = jwt.sign(email + password, process.env.JWT_SECRET)
        res.status(200).json({success: true, messege: "LoggedIn Successfull", token})
    } catch (error) {
        return res.status(500).json({success: false, messege: "Error in Login: " + error})
    }
}