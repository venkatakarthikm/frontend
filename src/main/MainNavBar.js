import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './style.css';


import Contact from './Contact';
import PageNotFound from './PageNotFound';

import Virat from '../details/Virat';
import Rohit from '../details/Rohit';
import Dhoni from '../details/Dhoni';

import PublisherLogin from './../publisher/PublisherLogin';
import ReaderLogin from '../reader/ReaderLogin';
import ReaderRegistration from './../reader/ReaderRegistration';
import ViewNews from './News';
import AddComment from './AddComment';
import Matches from './Matches';
import PointsTable from './PointsTable';


export default function MainNavBar({onPublisherLogin,onReaderLogin}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
      <nav>
      <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown" >
            <Link >Matches</Link>
            <div className="dropdown-content">
              <Link to="/matches">Matches</Link>
              <Link to="/pointstable">Ipl </Link>
              <Link to="/">players</Link>
            </div>
            </li>
          <li><Link to="/viewnews">News</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
          <li className="dropdown" >
            <Link>Login</Link>
            <div className="dropdown-content">
              <Link to="/readerlogin">Reader Login</Link>
              <Link to="/readerregistration">Reader Registration</Link>
              <Link to="/publisherlogin">publisher Login</Link>
            </div>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/viewnews" element={<ViewNews/>} exact />
        <Route path="/matches" element={<Matches/>} exact />
        <Route path="/about" element={<About/>} exact />
        <Route path="/contact" element={<Contact/>} exact />
        <Route path="/pointstable" element={<PointsTable/>} exact />

        <Route path="/virat" element={<Virat/>} exact/>
        <Route path="/rohit" element={<Rohit/>} exact/>
        <Route path="/dhoni" element={<Dhoni/>} exact/>

        <Route path="/publisherlogin" element={<PublisherLogin onPublisherLogin={onPublisherLogin}/>} exact/>
        <Route path="/readerregistration" element={<ReaderRegistration/>} exact/>
        <Route path="/readerlogin" element={<ReaderLogin onReaderLogin={onReaderLogin}/>} exact/>
        
        <Route path="/addcomment" element={<AddComment/>} exact/>

        <Route path="*" element={<PageNotFound/>} exact />        
      </Routes>
      {/* Footer */}
      <footer style={{ backgroundColor: "lightgray", textAlign: "center", padding: "5px", marginTop: "auto", height: "30px" }}>
        <p style={{ color: "rgba(0, 0, 0, 0.5)", margin: "0" }}>@MVK2024</p>
      </footer>
    </div>
  );
}