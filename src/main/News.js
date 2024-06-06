import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import StarRateIcon from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";

import config from "../config";
//import AddComment from "./AddComment";

export default function News() {
  const [news, setNews] = useState([]);
  const [counts, setCounts] = useState({});
  const [avgrate, setAvgrate] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchNews = async () => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const response = await axios.get(`${config.url}/viewnews/`);
      setNews(response.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  const addComment = async (newsid) => {
    try {
      localStorage.setItem("newsid", newsid);
      const response = await axios.get(
        `${config.url}/viewmynewstodelete/${newsid}`
      );
      if (response.data != null) {
        localStorage.setItem("newsdata", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCount = async (newsid) => {
    try {
      const response = await axios.get(`${config.url}/viewcomments/${newsid}`);
      setCounts((prevCounts) => ({
        ...prevCounts,
        [newsid]: response.data.length,
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getavgrating = async (newsid) => {
    try {
      const response = await axios.get(`${config.url}/getavgrating/${newsid}`);
      setAvgrate((prevAvgrate) => ({
        ...prevAvgrate,
        [newsid]: response.data.averageRating,
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    news.forEach((newsItem) => {
      fetchCount(newsItem.newsid);
      getavgrating(newsItem.newsid);
    });
  }, [news]);

  return (
    <div>
      {loading && (
        <div>
          <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1100 }}>
            <LinearProgress
              sx={{
                bgcolor: "lightgrey",
                "& .MuiLinearProgress-bar": { bgcolor: "black" },
              }}
            />
          </Box>

          <Box
            sx={{
              width: 1500,
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton animation="wave" />
          </Box>
        </div>
      )}
      {Array.isArray(news) && news.length > 0
        ? news.map((newsItem, index) => (
            <div key={index} className="card">
              <div className="row">
                <div className="text">
                  <img src={newsItem.imagelink} alt="" />
                  <h2>{newsItem.title}</h2>
                  <h5>Date & Time: {newsItem.postedtime} </h5>
                  <p>{newsItem.description}</p>
                  <h5>News ID: {newsItem.newsid} </h5>
                  <h5>Published by: {newsItem.publishedby} </h5>
                  <div>
                    <CommentIcon /> {counts[newsItem.newsid]}
                    <StarRateIcon /> {avgrate[newsItem.newsid]}
                  </div>
                </div>
              </div>
              <div>
                <Link to="/addcomment">
                  <button
                    onClick={() => addComment(newsItem.newsid)}
                    style={{ marginRight: "10px" }}
                    title="Add Comment"
                  >
                    <AddCommentIcon />
                  </button>
                </Link>
              </div>
            </div>
          ))
        : !loading && <div>Data Not Found or connect to database</div>}
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          right: "10px",
          zIndex: "1000",
        }}
      >
        <button
          onClick={scrollToTop}
          style={{
            backgroundColor: "transparent",
            border: "1px solid black",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <KeyboardArrowUpOutlinedIcon
            style={{ fontSize: "20px", color: "#000" }}
          />
        </button>
      </div>
    </div>
  );
}
