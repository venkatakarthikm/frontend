import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';


export default class Virat extends Component {
  state = {
    query: '',
    videos: [],
    selectedVideo: null,
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const { query } = this.state;
    this.setState({ loading: true }); // Activate the loader
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          q: query,
          part: 'snippet',
          maxResults: 5, // Number of videos to display
          type: 'video',
        },
      });
      this.setState({ videos: response.data.items });
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      this.setState({ loading: false }); // Deactivate the loader
    }
  };

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const { query, videos, selectedVideo, loading } = this.state;

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <div>
        {loading && <div className="loader"></div>} {/* Show loader if loading */}
        <div>
          {selectedVideo && (
            <YouTube videoId={selectedVideo.id.videoId} opts={opts} />
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={query} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <div style={{ display: 'flex', overflowX: 'scroll', justifyContent: 'center' }}>
          {videos.map((video) => (
            <div key={video.id.videoId} style={{ marginRight: '10px' }}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                onClick={() => this.handleVideoSelect(video)}
                style={{ cursor: 'pointer' }}
              />
              <p style={{ textAlign: 'center' }}>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
