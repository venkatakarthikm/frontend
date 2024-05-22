import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';


export default function PublisherLogin({onPublisherLogin}) 
{
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const notifySuccess = (msg) => toast.success(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const notifyError = (msg) => toast.error(msg, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkpublisherlogin`, formData);
      if (response.data != null) 
      {
        onPublisherLogin();

        localStorage.setItem('publisher', JSON.stringify(response.data));
        notifySuccess("Login Success !");
        navigate("/");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
        notifyError(message);
      }
    } 
    catch (errorr) 
    {
      setMessage("")
      setError(errorr.message)
      notifyError(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Publisher Login</h3>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}