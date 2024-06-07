import React, { useState, useEffect } from 'react';



import { BrowserRouter as Router } from 'react-router-dom';
import MainNavBar from './main/MainNavBar';
import PublisherNavbar from './publisher/PublisherNavbar';
import ReaderNavBar from './reader/ReaderNavBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreloaderWrapper from './main/Preloader';

import AdsComponent from './AdsComponent';

export default function App() {
  const [isPublisherLoggedIn, setIsPublisherLoggedIn] = useState(false);
  const [isReaderLoggedIn, setIsReaderLoggedIn] = useState(false);

  useEffect(() => {
    const publisherLoggedIn = localStorage.getItem('isPublisherLoggedIn') === 'true';
    const readerLoggedIn = localStorage.getItem('isReaderLoggedIn') === 'true';

    setIsPublisherLoggedIn(publisherLoggedIn);
    setIsReaderLoggedIn(readerLoggedIn);
  }, []);

  const onPublisherLogin = () => {
    localStorage.setItem('isPublisherLoggedIn', 'true');
    setIsPublisherLoggedIn(true);
  };

  const onReaderLogin = () => {
    localStorage.setItem('isReaderLoggedIn','true');
    setIsReaderLoggedIn(true);
  };

  
  return (
    <div className="App">
      <Router>
        {isPublisherLoggedIn ? (
          <>
          <PublisherNavbar />
          <ToastContainer />
          <PreloaderWrapper/>
          <>
            <h1>Place To Show Google AdSense</h1>
            <AdsComponent dataAdSlot='2961221610' />
          </>
          </>
          
        ): isReaderLoggedIn ? (
          <>
          <ReaderNavBar/>
          <ToastContainer />
          <PreloaderWrapper/>
          <>
            <h1>Place To Show Google AdSense</h1>
            <AdsComponent dataAdSlot='2961221610' />
          </>
          </>

        ): (
          <>
          <MainNavBar
            onPublisherLogin={onPublisherLogin}
            onReaderLogin={onReaderLogin}
          />
          <ToastContainer />
          <PreloaderWrapper/>
          <>
            <h1>Place To Show Google AdSense</h1>
            <AdsComponent dataAdSlot='2961221610' />
          </>
          </>
        )}
      </Router>
    </div>
    
  );
}
