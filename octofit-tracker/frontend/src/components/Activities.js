import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities Component - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities Component - Processed data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities Component - Error fetching data:', error);
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
        <p className="mt-3">Loading activities...</p>
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
        <i className="bi bi-activity me-2"></i>
        Activities
      </h2>
      {activities.length === 0 ? (
        <div className="empty-container">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <p className="empty-message mt-3">No activities found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id || activity._id || index}>
                  <td><span className="badge bg-secondary">{activity.id || activity._id || index + 1}</span></td>
                  <td>
                    <span className="badge bg-info">{activity.activity_type}</span>
                  </td>
                  <td>
                    <i className="bi bi-clock me-1"></i>
                    {activity.duration} min
                  </td>
                  <td>
                    <i className="bi bi-fire me-1"></i>
                    {activity.calories_burned}
                  </td>
                  <td>
                    <i className="bi bi-calendar-event me-1"></i>
                    {new Date(activity.date).toLocaleDateString()}
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

export default Activities;
