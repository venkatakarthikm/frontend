import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';


export default function ReaderRegistration() 
{
  //formData state variable is initialized with all required keys and empty values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    gender: '',
    location: '',
    password: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [errorr, setError] = useState('');

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

  const handleChange = (e) =>   // e - event
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});
    
    // It updates the state `formData` by adding or updating a property with a key equal to 
    //the ID of the input field 
    //that triggered the change event (e.target.id). The value of this property is 
    //set to the new value entered in that input field (e.target.value).
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/insertreader`, formData);
      if (response.status === 200) 
      {
        //It will set all fields to ""
        setFormData({
            username: '',
            email: '',
            gender: '',
            location: '',
            password: ''
        });
      }
      setMessage(response.data);
      setError(''); //set error to ""
      notifySuccess(message);
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage(''); //set message to ""
      notifyError(errorr);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Reader Registration</h3>
        <div>
          <label>User Name</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}