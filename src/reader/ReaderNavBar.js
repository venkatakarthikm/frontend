import {Route, Routes,Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReaderHome from './ReaderHome';
import Contact from '../main/Contact';
import About from '../main/About';
import PageNotFound from '../main/PageNotFound';
import './reader.css'

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import IconButton from '@mui/material/IconButton';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import ViewNews from '../main/News';
import AddComment from './../main/AddComment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReaderNavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isReaderLoggedIn');
    localStorage.removeItem('reader');
    notifyInfo("logged out !")
    navigate('/readerlogin');
    window.location.reload()
  };

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

  const [readerData,setReaderData] = useState("");

  useEffect(() => {
    const storedReaderData = localStorage.getItem('reader');
    if (storedReaderData) {
      const parsedReaderData = JSON.parse(storedReaderData);
      setReaderData(parsedReaderData)
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // For smooth scrolling
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav>
      <ul>
        <li><p>Hi {readerData.username}</p></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/viewnews">News</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li><IconButton style={{ color: "white" }} onClick={handleLogout}><LogoutSharpIcon/></IconButton></li>
      </ul>
      </nav>

      <Routes>
        <Route path="/viewnews" element={<ViewNews/>} exact />
        <Route path="/" element={<ReaderHome/>} exact />
        <Route path="/contact" element={<Contact/>} exact />
        <Route path="/about" element={<About/>} exact />

        <Route path="/addcomment" element={<AddComment/>} exact/>

        <Route path="*" element={<PageNotFound/>} exact />
      </Routes>

      <div style={{ position: 'fixed', bottom: '0px', right: '10px', zIndex: '1000' }}>
        <button onClick={scrollToTop} style={{ backgroundColor: 'transparent', border: '1px solid black', outline: 'none', cursor: 'pointer' }}>
          <KeyboardArrowUpOutlinedIcon style={{ fontSize: '20px', color: '#000' }} />
        </button>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "lightgray", textAlign: "center", padding: "5px", marginTop: "auto", height: "30px" }}>
        <p style={{ color: "rgba(0, 0, 0, 0.5)", margin: "0" }}>@MVK2024</p>
      </footer>
    </div>
  )
}
