import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="bi bi-exclamation-triangle-fill" style={{fontSize: '3rem', color: '#d63c70'}}></i>
        <p className="error-message mt-3">Error: {error}</p>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="component-card">
      <h2>
        <i className="bi bi-trophy-fill me-2"></i>
        Leaderboard
      </h2>
      {leaderboard.length === 0 ? (
        <div className="empty-container">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <p className="empty-message mt-3">No leaderboard entries found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Calories</th>
                <th>Total Activities</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const rankBadge = index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-primary';
                const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
                return (
                  <tr key={entry.id || entry._id || index}>
                    <td>
                      <span className={`badge ${rankBadge}`}>
                        {rankIcon} {index + 1}
                      </span>
                    </td>
                    <td><strong>
                      {entry.user_name || entry.name || entry.username || entry.user?.username || 
                       entry.user?.name || entry.user_id || entry.user || `User ${index + 1}`}
                    </strong></td>
                    <td>
                      <span className="badge bg-info">{entry.team?.name || entry.team || 'N/A'}</span>
                    </td>
                    <td>
                      <i className="bi bi-fire me-1"></i>
                      <strong>{entry.total_calories || entry.total_points || 0}</strong>
                    </td>
                    <td>
                      <i className="bi bi-activity me-1"></i>
                      {entry.total_activities || 0}
                    </td>
                    <td>
                      <i className="bi bi-calendar-event me-1"></i>
                      {new Date(entry.last_updated).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
