import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../reader/matchcard.css';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filter, setFilter] = useState(''); // State to hold the selected filter
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data from local storage on component mount
    const storedMatches = localStorage.getItem('matchesData');
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches));
      setIsLoading(false);
    } else {
      fetchMatches(); // Fetch data from API if not available in local storage
    }
  }, []);

  const fetchMatches = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
        headers: {
          'X-RapidAPI-Key': '86590e184bmsh3586ffb45c8dbe8p1e1f5bjsn172a244c0755',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      localStorage.setItem('matchesData', JSON.stringify(response.data));
      setMatches(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Filter matches based on selected type
    if (filter && matches && matches.filters && matches.filters.matchType) {
      const filtered = matches.typeMatches.find(type => type.matchType === filter);
      setFilteredMatches(filtered ? filtered.seriesMatches : []);
    } else {
      setFilteredMatches([]);
    }
  }, [filter, matches]);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('matchesData');
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
      {isLoading ? (
        <div align="center">
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          <div style={{width:170 }}>
            <label htmlFor="filter">select:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="">All</option>
              {matches.filters && matches.filters.matchType.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="match-container">
  {filteredMatches.length > 0 ? (
    filteredMatches.map(series => (
      <div key={series.seriesAdWrapper && series.seriesAdWrapper.seriesId}>
        <h2>{series.seriesAdWrapper && series.seriesAdWrapper.seriesName}</h2>
        {series.seriesAdWrapper && series.seriesAdWrapper.matches.map(match => (
          <div key={match.matchInfo && match.matchInfo.matchId} className="match-card">
            <div className="match-info">
              <h3>{match.matchInfo && match.matchInfo.matchDesc}</h3>
              <div className="team">
                <span className="team-name" style={{ fontWeight: 'bold' }}>{match.matchInfo && match.matchInfo.team1 && match.matchInfo.team1.teamName}</span>
                <span className="team-vs"> VS </span>
                <span className="team-name" style={{ fontWeight: 'bold' }}>{match.matchInfo && match.matchInfo.team2 && match.matchInfo.team2.teamName}</span>
              </div>
              {match.matchInfo && match.matchInfo.venueInfo && (
                  <span style={{ fontSize: '0.8em' }}>Venue: {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}</span>
                )}
              
              <br/>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {match.matchInfo && match.matchInfo.team1 && (
                  <div>
                    <span className="team-score">{match.matchInfo.team1.teamSName}: {match.matchScore && match.matchScore.team1Score && match.matchScore.team1Score.inngs1 && match.matchScore.team1Score.inngs1.runs ? match.matchScore.team1Score.inngs1.runs : '0'} / <span style={{ color: 'red' }}>{match.matchScore && match.matchScore.team1Score && match.matchScore.team1Score.inngs1 ? match.matchScore.team1Score.inngs1.wickets : '0'}</span></span>
                    <br />
                    <span className="team-score">Overs: {match.matchScore && match.matchScore.team1Score && match.matchScore.team1Score.inngs1 ? match.matchScore.team1Score.inngs1.overs : '0'}</span>
                    <br />
                  </div>
                )}
                {match.matchInfo && match.matchInfo.team2 && (
                  <div>
                    <span className="team-score">{match.matchInfo.team2.teamSName}: {match.matchScore && match.matchScore.team2Score && match.matchScore.team2Score.inngs1 && match.matchScore.team2Score.inngs1.runs ? match.matchScore.team2Score.inngs1.runs : '0'} / <span style={{ color: 'red' }}>{match.matchScore && match.matchScore.team2Score && match.matchScore.team2Score.inngs1 ? match.matchScore.team2Score.inngs1.wickets : '0'}</span></span>
                    <br />
                    <span className="team-score">Overs: {match.matchScore && match.matchScore.team2Score && match.matchScore.team2Score.inngs1 ? match.matchScore.team2Score.inngs1.overs : '0'}</span>
                    <br />
                  </div>
                )}
              </div>
              {match.matchInfo && (
                <span>State: {match.matchInfo.state}</span>
              )}
              <br/>
              {match.matchInfo && <span>Status: {match.matchInfo.status}</span>}
            </div>
          </div>
        ))}
      </div>
    ))
  ) : (
    <p>No matches found for the selected type.</p>
  )}
</div>
        </>
      )}
    </div>
  );
}
