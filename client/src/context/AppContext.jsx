import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppProvider = ({children}) => {
    const [blogs, setBlogs] = useState([ ]);
    const [token, setToken] = useState(null);
    const [input, setInput] = useState('');

    const fetchBlogs = async () => {
        try {
            let response = await axios.get(`${backendUrl}/api/blog/all-blogs`, {withCredentials: true});
            if(response.data){
                setBlogs(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    },[])

    return (
        <AppContext.Provider value={{backendUrl, blogs, token, setToken, input, setInput}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}