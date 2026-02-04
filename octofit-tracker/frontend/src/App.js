import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-logo.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-people-fill me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-flag-fill me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-activity me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy-fill me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-lightning-fill me-1"></i>Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <div className="home-container">
                  <h1 className="display-3 text-center">
                    <img src="/octofitapp-logo.png" alt="OctoFit Logo" style={{height: '80px', marginRight: '20px', borderRadius: '12px'}} />
                    Welcome to OctoFit Tracker!
                  </h1>
                  <p className="lead text-center">Track your fitness activities, compete with teams, and achieve your goals.</p>
                  <hr className="my-4" />
                  <div className="row mt-5">
                    <div className="col-md-4 mb-3">
                      <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                          <i className="bi bi-people-fill" style={{fontSize: '3rem', color: '#e91e63'}}></i>
                          <h5 className="card-title mt-3">Manage Users</h5>
                          <p className="card-text">View and track all registered users</p>
                          <Link to="/users" className="btn btn-primary">View Users</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                          <i className="bi bi-flag-fill" style={{fontSize: '3rem', color: '#e91e63'}}></i>
                          <h5 className="card-title mt-3">Teams</h5>
                          <p className="card-text">Create and manage fitness teams</p>
                          <Link to="/teams" className="btn btn-primary">View Teams</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card text-center border-0 shadow-sm">
                        <div className="card-body">
                          <i className="bi bi-trophy-fill" style={{fontSize: '3rem', color: '#e91e63'}}></i>
                          <h5 className="card-title mt-3">Leaderboard</h5>
                          <p className="card-text">See who's leading the competition</p>
                          <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
