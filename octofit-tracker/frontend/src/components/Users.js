import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    team: ''
  });

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    const teamsUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Users Component - Fetching from:', apiUrl);

    // Fetch users
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users Component - Raw data received:', data);
        const usersData = data.results || data;
        console.log('Users Component - Processed data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users Component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });

    // Fetch teams
    fetch(teamsUrl)
      .then(response => response.json())
      .then(data => {
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      })
      .catch(error => {
        console.error('Users Component - Error fetching teams:', error);
      });
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      team: user.team || ''
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({
      name: '',
      email: '',
      team: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = editingUser._id || editingUser.id;
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/${userId}/`;
    
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      
      // Update the users list
      setUsers(users.map(u => 
        (u._id || u.id) === userId ? updatedUser : u
      ));
      
      handleCancel();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users...</p>
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
        <i className="bi bi-people-fill me-2"></i>
        Users
      </h2>
      
      {editingUser && (
        <div className="edit-modal-overlay" onClick={handleCancel}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>
                <i className="bi bi-pencil-square me-2"></i>
                Edit User
              </h3>
              <button className="btn-close-modal" onClick={handleCancel}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="team" className="form-label">Team</label>
                <select
                  className="form-select"
                  id="team"
                  name="team"
                  value={editForm.team}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a team...</option>
                  {teams.map((team, index) => (
                    <option key={team._id || team.id || index} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-lg me-1"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {users.length === 0 ? (
        <div className="empty-container">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          <p className="empty-message mt-3">No users found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || user._id || index}>
                  <td><span className="badge bg-secondary">{user.id || user._id || index + 1}</span></td>
                  <td><strong>{user.name || user.username || 'N/A'}</strong></td>
                  <td>{user.email || 'N/A'}</td>
                  <td>
                    <span className="badge bg-info">{user.team || 'No Team'}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(user)}
                      title="Edit user"
                    >
                      <i className="bi bi-pencil-fill"></i> Edit
                    </button>
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

export default Users;
