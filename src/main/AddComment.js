import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../publisher/publish.css'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import { Rating, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function AddComment() {
    const [publisherData, setPublisherData] = useState('');
    const [readerData,setReaderData] = useState("");
    const [newsData, setNewsData] = useState("");
    const isPublisherLoggedIn = localStorage.getItem('isPublisherLoggedIn');
    const isReaderLoggedIn = localStorage.getItem('isReaderLoggedIn');
    const [comments, setComments] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [value, setValue] = useState(null);

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

    useEffect(() => {

      const storedNewsData = localStorage.getItem('newsdata');
      if (storedNewsData) {
        const parsedNewsData = JSON.parse(storedNewsData);
        setNewsData(parsedNewsData);
      }
        
      const storedPublisherData = localStorage.getItem('publisher');
      if (storedPublisherData) {
        const parsedPublisherData = JSON.parse(storedPublisherData);
        setPublisherData(parsedPublisherData);
      }
      else
      {
        const storedReaderData = localStorage.getItem('reader');
        if (storedReaderData) {
            const parsedReaderData = JSON.parse(storedReaderData);
            setReaderData(parsedReaderData)
        }
      }
    }, []);
  
    const [formData, setFormData] = useState({
      commenttext: '',
        newsid: '',
        commentername: ''
        
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
          let commenterName;
          if (isPublisherLoggedIn) {
            commenterName = publisherData.username + "℗";
          } else if (isReaderLoggedIn) {
              commenterName = readerData.username + "®️";
          } else {
              setError('You need to log in as either a publisher or a reader.');
              setMessage('');
              notifyError(error);
              return;
          }
      
          const response = await axios.post(`${config.url}/addcomment`, {
            ...formData,
            commentername: commenterName,
            newsid: localStorage.getItem('newsid'),
          });
      
          if (response.status === 200) {
            // Clear the form data after successful submission
            setFormData({
              commenttext: '',
              newsid: '',
              commentername: ''
            });
          }
      
          setMessage('Comment added successfully.');
          setError('');
          notifySuccess(message);
        } catch (errorr) {
          setError(errorr.response.data);
          setMessage('');
          notifyError(error)
        }
      };

      const handleRatingChange = (event) => {
        // Set the rating value when a radio button is selected
        setRatingValue(parseInt(event.target.value));
      };
    
      const handleSaveRating = async () => {
        try {
          let username;
          if (isPublisherLoggedIn) {
            username = publisherData.username + "℗";
          } else if (isReaderLoggedIn) {
            username = readerData.username + "®️";
          } else {
            setError('You need to log in to give a rating.');
            notifyError(error);
            return;
          }
          const response = await axios.post(`${config.url}/saverating`, {
            newsid: newsData.newsid,
            rusername: username,
            ratingpoint: ratingValue,
          });
          console.log(response.data); // Assuming the backend sends a success message
        } catch (error) {
          console.error('Error saving rating:', error.message);
        }
      };

      const fetchcomments = async () => {
        try {
          const response = await axios.get(`${config.url}/viewcomments/${newsData.newsid}`);
          setComments(response.data);
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

      const fetchRating = async () => {
        try {
          let username;
          if (isPublisherLoggedIn) {
            username = publisherData.username + "℗";
          } else if (isReaderLoggedIn) {
            username = readerData.username + "®️";
          } else {
            setError('You need to log in to give a rating.');
            return;
          }
          const response = await axios.get(`${config.url}/getmyrating`, {
            newsid: newsData.newsid,
            rusername: username,
          });
          console.log(response.data);

          const rating = response.data; // Assuming the rating is stored in the 'rating' field
          setValue(rating);
        } catch (error) {
          console.error('Error fetching rating:', error);
        }
      };

      useEffect(() => {
        fetchcomments();
      });

      useEffect(() => {
        fetchRating();
      });

  return (
    <div>
          <div class="card">
            <div class="row">
              <div class="text">
                <img src={newsData.imagelink} alt="" />
                <h2>{newsData.title}</h2>
                <h5>Date & Time: {newsData.postedtime}</h5>
                <p>{newsData.description}</p>
                <h5>News ID: {newsData.newsid}</h5>
                <h5>published by: {newsData.publishedby}</h5>
                <h5>your rating <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.1}
                    readOnly // Set readOnly to true to prevent users from changing the rating
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: 'gold',
                      },
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55,'& .MuiRating-iconFilled': {
                        color: 'gold',
                      }, }} fontSize="inherit" />}
                  /></h5>
                
                <div>
                  <Rating
                    name={`rating-${newsData.newsid}`}
                    title='Give rating'
                    value={ratingValue}
                    onChange={handleRatingChange}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: 'gold',
                      },
                    }}
                  />
                  <Button onClick={handleSaveRating}><SendIcon/></Button>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>


      <h3 align="center">Comment Section</h3>
      {/* {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      } */}

      <section className="content-item" id="comments">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <form onSubmit={handleSubmit}>
              <h3 className="pull-left">Add Comment</h3>
              <fieldset className="pull-left" >
                <div className="row">
                  <div className="col-sm-3 col-lg-2 hidden-xs">
                  </div>
                  <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                    <textarea className="form-control" id="commenttext" placeholder="Your comment" onChange={handleChange} required></textarea>
                  </div>
                </div>
              </fieldset>
              <button type="submit" className="btn btn-normal pull-right">Submit</button>
            </form>

            <h3>No of Comment: {comments.length}</h3>

            {/* COMMENTS */}
            
            {/* COMMENTS END */}
          </div>
        </div>
      </div>
    </section>

    {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((commentsItem, index) => (
          <div className="comment-container">
              <h4 className="media-heading">{commentsItem.commentername}</h4>
              <p>{commentsItem.commenttext}</p>
              <ul className="list-unstyled list-inline media-detail pull-left">
                  <li><i className="fa fa-calendar"></i>{commentsItem.commentedtime}</li>
              </ul>
          </div>
        ))
      ) : (
        <div> No Comments </div>
      )}

      <div style={{ position: 'fixed', bottom: '0px', right: '10px', zIndex: '1000' }}>
        <button onClick={scrollToTop} style={{ backgroundColor: 'transparent', border: '1px solid black', outline: 'none', cursor: 'pointer' }}>
          <KeyboardArrowUpOutlinedIcon style={{ fontSize: '20px', color: '#000' }} />
        </button>
      </div>

    </div>
  );
}
