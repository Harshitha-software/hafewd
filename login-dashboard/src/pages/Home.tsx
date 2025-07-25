import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataAPI } from '../services/api';
import { Project, LeaderboardEntry } from '../types';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, leaderboardData] = await Promise.all([
          dataAPI.getProjects(),
          dataAPI.getLeaderboard(),
        ]);
        setProjects(projectsData);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getProjectStatusCount = (status: string) => {
    return projects.filter((project) => project.status === status).length;
  };

  const getUserRank = () => {
    const userEntry = leaderboard.find(
      (entry) => entry.username === user?.username
    );
    return userEntry?.rank || 'N/A';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>
            {getGreeting()}, {user?.firstName}! 👋
          </h1>
          <p>Welcome back to your dashboard. Here's what's happening today.</p>
        </div>
        <div className="user-avatar">
          <div className="avatar-circle">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Projects</h3>
              <p className="stat-number">{projects.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p className="stat-number">
                {getProjectStatusCount('completed')}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-content">
              <h3>Active</h3>
              <p className="stat-number">{getProjectStatusCount('active')}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Your Rank</h3>
              <p className="stat-number">#{getUserRank()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <a href="/dashboard/projects" className="view-all-link">
            View All
          </a>
        </div>

        <div className="projects-grid">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status-badge status-${project.status}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <span className="project-date">
                  Updated: {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-button">
            <span className="action-icon">➕</span>
            <span>New Project</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📈</span>
            <span>View Analytics</span>
          </button>
          <button className="action-button">
            <span className="action-icon">⚙️</span>
            <span>Settings</span>
          </button>
          <button className="action-button">
            <span className="action-icon">💬</span>
            <span>Support</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
