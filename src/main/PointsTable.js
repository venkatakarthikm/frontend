import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import './pointstable.css';

export default function PointsTable() {
  const [pointsTable, setPointsTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const options ={
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table',
          headers: {
            'X-RapidAPI-Key': '86590e184bmsh3586ffb45c8dbe8p1e1f5bjsn172a244c0755',
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        setPointsTable(response.data.pointsTable.pointsTableInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Matches Played</th>
            <th>Matches Won</th>
            <th>Matches Lost</th>
            <th>Points</th>
            <th>NRR</th>
          </tr>
        </thead>
        <tbody>
          {pointsTable && pointsTable.length > 0 ? (
            pointsTable.map((team, index) => (
              <tr key={index}>
                <td>{team.teamName}</td>
                <td>{team.matchesPlayed}</td>
                <td>{team.matchesWon}</td>
                <td>{team.matchesLost}</td>
                <td>{team.points}</td>
                <td>{team.nrr}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
