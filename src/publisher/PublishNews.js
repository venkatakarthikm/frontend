import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import './publish.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from '../config';

export default function PublishNews() {
  const [publisherData, setPublisherData] = useState('');

  useEffect(() => {
    const storedPublisherData = localStorage.getItem('publisher');
    if (storedPublisherData) {
      const parsedPublisherData = JSON.parse(storedPublisherData);
      setPublisherData(parsedPublisherData);
    }
  }, []);

  // const notifySuccess = (msg) => toast.success(msg, {
  //   position: "bottom-center",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  //   });
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

  const [formData, setFormData] = useState({
    imagelink: '',
    title: '',
    description: '',
    publishedby: '',
    publisher: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/publishnews`, {
        ...formData,
        publisher: publisherData,
        publishedby: publisherData.username,
      });
      if (response.status === 200) {
        setFormData({
          imagelink: '',
          title: '',
          description: '',
          publishedby: '',
          publisher: '',
        });
      }
      setMessage('News Published successfully.');
      setError('');
    } catch (errorr) {
      setError(errorr.response.data);
      setMessage('');
      notifyError(error);
    }
  };

  return (
    <div>
      <h3 align="center">Publish NEWS</h3>
      {message && (
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      )}
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="col-25">
            <label align="center" htmlFor="imagelink">
              Image Link
            </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="imagelink"
              value={formData.imagelink}
              onChange={handleChange}
              alt="image"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="description">Description</label>
          </div>
          <div className="col-75">
            <textarea
              type="text"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div align="center">
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
