import React, { useState, useEffect } from 'react';
import '../reader/matchcard.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


export default function PublisherHome() {
  const [todayMatches, setTodayMatches] = useState([]);
  const [yesterdayMatches, setYesterdayMatches] = useState([]);
  const [tomorrowMatches, setTomorrowMatches] = useState([]);
  const apiKeys = [
    'c27ed5aa-6de0-4903-a802-c2ab113d069b',
    'a3110a79-7d42-4737-ae8b-37a7a187ff4e',
    'db1d39c6-9997-4cf8-8bda-264543676a82',
    '330d4235-ffe8-4bc6-a3d5-eb3d62c3e678',
    'e621586a-f25b-41cc-92ca-c551e8b63682',
    'ac473aba-1d38-4cea-92d1-260431316e2f',
    '894424fb-78cb-43e6-9159-2363f527e5df',
    '8690dc6a-ba74-4a2a-b276-701dcfb667ae',
    '20ca70dc-1512-49e5-8090-42f337d1404d',
    '379c7beb-c7dc-4435-a68c-047d766bf8db',
    '2674379c-4be4-4719-a8d3-60cab0b92c63',
    'd383734d-eefe-4c6f-a48e-d3f8e5d8e99f',
    '74a98dd5-4b18-42a7-83cb-3c60314547f7',
    '366ed251-1b78-471c-ab12-515b2e2008c4',
    '7fa07657-4e50-42a3-ab21-b34d4bff075b',
    'd15cda87-cc5b-42ab-9c6a-849f15f308c5',
    '257951bc-e249-4caa-b160-6c5def8fe63c',
    'c0e5855b-da2e-43a2-a818-c61120d3ec48',
    '16116e48-b6cc-4f0d-a1ae-d5de3a155045',
    '44f62043-35e2-45d9-9c7c-7f5a64a3d1c4',
    // Add more API keys if available

  ];

  const fetchMatches = async () => {
    try {
      let allMatches = { todayMatches: [], yesterdayMatches: [], tomorrowMatches: [] };
      const currentDate = new Date();
      const twoDaysAgo = new Date(currentDate);
      twoDaysAgo.setDate(currentDate.getDate() - 1);
      const twoDaysLater = new Date(currentDate);
      twoDaysLater.setDate(currentDate.getDate() + 1);

      for (let i = 0; i < apiKeys.length; i++) {
        const response = await fetch(`https://api.cricapi.com/v1/cricScore?apikey=${apiKeys[i]}&offset=0`);
        const data = await response.json();

        if (data && data.data) {
          data.data.forEach(match => {
            const matchDate = new Date(match.dateTimeGMT);
            if (matchDate.toDateString() === currentDate.toDateString()) {
              allMatches.todayMatches.push(match);
            } else if (matchDate.toDateString() === twoDaysAgo.toDateString()) {
              allMatches.yesterdayMatches.push(match);
            } else if (matchDate.toDateString() === twoDaysLater.toDateString()) {
              allMatches.tomorrowMatches.push(match);
            }
          });
        }
      }

      setTodayMatches(allMatches.todayMatches);
      setYesterdayMatches(allMatches.yesterdayMatches);
      setTomorrowMatches(allMatches.tomorrowMatches);
      localStorage.setItem('matchData', JSON.stringify(allMatches));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMatches(); // Initial fetch when component mounts

    const intervalId = setInterval(() => {
      fetchMatches(); // Fetch matches every 1 hour
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }); // empty dependency array to run only on component mount

  const clearLocalStorage = () => {
    localStorage.removeItem('matchData');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearLocalStorage);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);

  return (
    <div>
      {todayMatches.length === 0 && yesterdayMatches.length === 0 && tomorrowMatches.length === 0 ? (
        <div align="center">
          <h2>API DATA IS LOADING. PLEASE DON'T RELOAD THE PAGE FOR A FEW MINUTES.</h2>
          <p style={{ color: 'red' }}>If data is not found after a few minutes, please reload the page.</p>
          <p style={{ color: 'red' }}>Even after reloading, if data is not found, then the API limit is over.</p>
          <Grid container spacing={2} justifyContent="center">
          {[0, 1, 2].map((index) => (
            <Grid item key={index}>
              <Box sx={{ width: 300, padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                  <Skeleton variant="text" />
                </Typography>
                <Skeleton variant="rectangular" width={250} height={150} />
                <Typography variant="body2" gutterBottom>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        </div>
      ) : (
        <>
          <div className="match-section">
            <h2 className="match-heading">Matches Today</h2>
            <div className="match-container">
              {todayMatches.map((matchesItem, index) => (
                <div key={index} className="match-card">
                  <div className="match-info">
                <span className="match-name">{matchesItem.series}</span>
                <br />
                <span className="match-date">Date(GMT): {matchesItem.dateTimeGMT}</span>
                <br />
                <div className="team">
                  <img src={matchesItem.t1img} alt="logo" className="team-logo" />
                  <span className="team-name">{matchesItem.t1}</span>
                  <span className="team-vs"> VS </span>
                  <span className="team-name">{matchesItem.t2}</span>
                  <img src={matchesItem.t2img} alt="logo" className="team-logo" />
                </div>
                <br />
                <span className="team-score">T1: {matchesItem.t1s}</span>
                <br />
                <span className="team-score">T2: {matchesItem.t2s}</span>
                <br />
                <span className="match-status">{matchesItem.status}</span>
              </div>
                </div>
              ))}
            </div>
          </div>
          <div className="match-section">
            <h2 className="match-heading">Matches Yesterday</h2>
            <div className="match-container">
              {yesterdayMatches.map((matchesItem, index) => (
                <div key={index} className="match-card">
                  <div className="match-info">
                <span className="match-name">{matchesItem.series}</span>
                <br />
                <span className="match-date">Date(GMT): {matchesItem.dateTimeGMT}</span>
                <br />
                <div className="team">
                  <img src={matchesItem.t1img} alt="logo" className="team-logo" />
                  <span className="team-name">{matchesItem.t1}</span>
                  <span className="team-vs"> VS </span>
                  <span className="team-name">{matchesItem.t2}</span>
                  <img src={matchesItem.t2img} alt="logo" className="team-logo" />
                </div>
                <br />
                <span className="team-score">T1: {matchesItem.t1s}</span>
                <br />
                <span className="team-score">T2: {matchesItem.t2s}</span>
                <br />
                <span className="match-status">{matchesItem.status}</span>
              </div>
                </div>
              ))}
            </div>
          </div>
          <div className="match-section">
            <h2 className="match-heading">Matches Tomorrow</h2>
            <div className="match-container">
              {tomorrowMatches.map((matchesItem, index) => (
                <div key={index} className="match-card">
                  <div className="match-info">
                <span className="match-name">{matchesItem.series}</span>
                <br />
                <span className="match-date">Date(GMT): {matchesItem.dateTimeGMT}</span>
                <br />
                <div className="team">
                  <img src={matchesItem.t1img} alt="logo" className="team-logo" />
                  <span className="team-name">{matchesItem.t1}</span>
                  <span className="team-vs"> VS </span>
                  <span className="team-name">{matchesItem.t2}</span>
                  <img src={matchesItem.t2img} alt="logo" className="team-logo" />
                </div>
                <br />
                <span className="team-score">T1: {matchesItem.t1s}</span>
                <br />
                <span className="team-score">T2: {matchesItem.t2s}</span>
                <br />
                <span className="match-status">{matchesItem.status}</span>
              </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
