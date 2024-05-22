import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './publish.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from '../config';

export default function UpdateMyNews() {
  const [newsData, setNewsData] = useState({
    imagelink: '',
    title: '',
    description: '',
    publishedby: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialNewsData, setInitialNewsData] = useState({});

  useEffect(() => {

    const storedNewsData = localStorage.getItem('newsdata');
    if (storedNewsData) {
      const parsedNewsData = JSON.parse(storedNewsData);
      setNewsData(parsedNewsData);
      setInitialNewsData(parsedNewsData);
    }

    // Set timeout to remove newsid from localStorage after 5 minutes
    const timeoutId = setTimeout(() => {
      localStorage.removeItem('newsid');
      localStorage.removeItem('newsdata');

    }, 6 * 60 * 1000); // 5 minutes in milliseconds
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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

    const notifyInfo = (msg) => toast.info(msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in newsData) {
        if (newsData[key] !== initialNewsData[key] && initialNewsData[key] !== '') {
          updatedData[key] = newsData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.newsid = newsData.newsid;
        const response = await axios.put(`${config.url}/updatemynews`, updatedData);
        setMessage(response.data);
        setError('');
        notifySuccess(message);
        const newsid = newsData.newsid;
        const res = await axios.get(`${config.url}/viewmynewstodelete/${newsid}`);
        localStorage.setItem("newsdata",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in news");
        setError("");
        notifyInfo("No Changes in news");
      }
    } catch (errorr) {
      setError(errorr.response.data);
      setMessage('');
      notifyError(error);
    }
  };

  return (
    <div>
      <h3 align="center">Update My News</h3>
      {/* {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>} */}
        <form onSubmit={handleSubmit} class="container"  >
          <div class="row">
        <div class="col-25">
            <label align="center" for="imagelink">Image Link</label>
        </div>
        <div class="col-75">
            <input type="text" id="imagelink" value={newsData.imagelink} onChange={handleChange} required />
        </div>
    </div>
    <div class="row">
        <div class="col-25">
            <label for="title">Title</label>
        </div>
        <div class="col-75">
            <input type="text" id="title" value={newsData.title} onChange={handleChange} required />
        </div>
    </div>
    <div class="row">
        <div class="col-25">
            <label for="description">Description</label>
        </div>
        <div class="col-75">
            <textarea type="text" id="description" value={newsData.description} onChange={handleChange} required></textarea>
        </div>
    </div>
    <div align="center">
        <button  type="submit">UPDATE</button>
    </div>
        </form>

        
    </div>
  );
}
