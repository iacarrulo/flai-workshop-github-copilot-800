import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error fetching data:', error);
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
        <p className="mt-3">Loading workouts...</p>
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
        <i className="bi bi-lightning-fill me-2"></i>
        Workouts
      </h2>
      {workouts.length === 0 ? (
        <div className="empty-container">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <p className="empty-message mt-3">No workouts found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Exercise Type</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.id || workout._id || index}>
                  <td><strong>{workout.name}</strong></td>
                  <td>{workout.description}</td>
                  <td>
                    <span className="badge bg-primary">{workout.activity_type || workout.exercise_type}</span>
                  </td>
                  <td>
                    <i className="bi bi-clock me-1"></i>
                    {workout.duration} min
                  </td>
                  <td>
                    {(workout.difficulty || workout.difficulty_level) ? (
                      <span className={`badge bg-${
                        (workout.difficulty || workout.difficulty_level) === 'easy' ? 'success' :
                        (workout.difficulty || workout.difficulty_level) === 'medium' ? 'warning' : 'danger'
                      }`}>
                        {(workout.difficulty || workout.difficulty_level).toUpperCase()}
                      </span>
                    ) : (
                      <span className="badge bg-secondary">N/A</span>
                    )}
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

export default Workouts;
