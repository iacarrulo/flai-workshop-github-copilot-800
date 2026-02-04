import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams Component - Processed data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams Component - Error fetching data:', error);
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
        <p className="mt-3">Loading teams...</p>
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
        <i className="bi bi-flag-fill me-2"></i>
        Teams
      </h2>
      {teams.length === 0 ? (
        <div className="empty-container">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <p className="empty-message mt-3">No teams found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id || team._id || index}>
                  <td><span className="badge bg-secondary">{team.id || team._id || index + 1}</span></td>
                  <td><strong>{team.name}</strong></td>
                  <td>{team.description}</td>
                  <td>
                    <span className="badge bg-info">
                      {team.members?.length || team.member_count || team.members_count || 0}
                    </span>
                  </td>
                  <td>
                    <i className="bi bi-calendar-event me-1"></i>
                    {new Date(team.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
