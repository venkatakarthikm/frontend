import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mynews.css';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'; // Import Dialog components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function ViewMyNews() {
  const [publisherData, setPublisherData] = useState("");
  const [news, setNews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [counts, setCounts] = useState({});
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog
  const [deleteNewsId, setDeleteNewsId] = useState(null); // State to store news id to be deleted

  useEffect(() => {
    const storedPublisherData = localStorage.getItem('publisher');
    if (storedPublisherData) {
      const parsedPublisherData = JSON.parse(storedPublisherData);
      setPublisherData(parsedPublisherData);
    }
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.url}/viewmynews/${publisherData.username}`);
      setNews(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // For smooth scrolling
    });
  };

  const viewComment = async (newsid) => {
    try {
      localStorage.setItem('newsid', newsid);
      const response = await axios.get(`${config.url}/viewmynewstodelete/${newsid}`);
      if (response.data != null) {
        localStorage.setItem('newsdata', JSON.stringify(response.data));
        window.location.href = '/addcomment/';
      }
    } catch (errorr) {
      notifyInfo(errorr.message);
    }
  };
  const update = async (newsid) => {
    try {
      localStorage.setItem('newsid', newsid);
      const response = await axios.get(`${config.url}/viewmynewstodelete/${newsid}`);
      if (response.data != null) {
        localStorage.setItem('newsdata', JSON.stringify(response.data));
        window.location.href = '/updatemynews/';
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCount = async (newsid) => {
    try {
      const response = await axios.get(`${config.url}/viewcomments/${newsid}`);
      setCounts(prevCounts => ({
        ...prevCounts,
        [newsid]: response.data.length
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (publisherData.username) {
        await fetchNews();
      }
    };
    fetchData();
  },);

  useEffect(() => {
    // Fetch count for each news item
    if (Array.isArray(news)) {
      news.forEach(newsItem => {
        fetchCount(newsItem.newsid);
      });
    }
  }, [news]);

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

  const deleteNews = async (newsid) => {
    setDeleteNewsId(newsid); // Set the news id to be deleted
    setOpenDialog(true); // Open the dialog
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${config.url}/deletemynews/${deleteNewsId}`);
      fetchNews();
      setShowAlert(true); // Show alert on successful deletion
      setOpenDialog(false); // Close the dialog after successful deletion
    } catch (errorr) {
      notifyInfo(errorr.message);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div>
      {showAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="success">News deleted successfully.</Alert>
        </Stack>
      )}
      {Array.isArray(news) && news.length > 0 ? (
        news.map((newsItem, index) => (
          <div key={index} class="card">
            <div class="row">
              <div class="text">
                <img src={newsItem.imagelink} alt="" />
                <h2>{newsItem.title}</h2>
                <h5>Date & Time: {newsItem.postedtime}</h5>
                <p>{newsItem.description}</p>
                <h5>News ID: {newsItem.newsid}</h5>
                <h5><CommentIcon /> {counts[newsItem.newsid] || 0}</h5>
              </div>
            </div>
            <div>
              <button className='bt' onClick={() => viewComment(newsItem.newsid)} style={{ marginRight: '10px' }} title="View Comment" ><CommentIcon /></button>
              <button onClick={() => update(newsItem.newsid)} style={{ marginRight: '10px' }} title="Edit News" ><EditIcon /></button>
              <button onClick={() => deleteNews(newsItem.newsid)} title="Delete news" ><DeleteForeverIcon /></button>
            </div>
          </div>
        ))
      ) : (
        <div>you have not published any data</div>
      )}
      <div style={{ position: 'fixed', bottom: '0px', right: '10px', zIndex: '1000' }}>
        <button onClick={scrollToTop} style={{ backgroundColor: 'transparent', border: '1px solid black', outline: 'none', cursor: 'pointer' }}>
          <KeyboardArrowUpOutlinedIcon style={{ fontSize: '20px', color: '#000' }} />
        </button>
      </div>

      {/* Dialog for confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete News"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this news item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
