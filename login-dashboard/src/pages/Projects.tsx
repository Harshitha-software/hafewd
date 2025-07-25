import React, { useState, useEffect } from 'react';
import { dataAPI } from '../services/api';
import { Project } from '../types';
import './Projects.css';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    'all' | 'active' | 'completed' | 'pending'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await dataAPI.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🚀';
      case 'completed':
        return '✅';
      case 'pending':
        return '⏳';
      default:
        return '📁';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#48bb78';
      case 'completed':
        return '#4299e1';
      case 'pending':
        return '#ed8936';
      default:
        return '#718096';
    }
  };

  const getFilteredProjects = () => {
    let filtered = projects;

    if (filter !== 'all') {
      filtered = filtered.filter((project) => project.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getProjectCount = (status: string) => {
    if (status === 'all') return projects.length;
    return projects.filter((project) => project.status === status).length;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  const filteredProjects = getFilteredProjects();

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <div className="header-content">
          <h1>📁 Projects</h1>
          <p>Manage and track your project portfolio</p>
        </div>
        <button className="new-project-btn">
          <span>+</span>
          New Project
        </button>
      </div>

      {/* Stats Overview */}
      <div className="projects-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Projects</h3>
            <p>{projects.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <h3>Active</h3>
            <p>{getProjectCount('active')}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p>{getProjectCount('completed')}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p>{getProjectCount('pending')}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="projects-controls">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({getProjectCount('all')})
          </button>
          <button
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({getProjectCount('active')})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({getProjectCount('completed')})
          </button>
          <button
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({getProjectCount('pending')})
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <div className="no-projects-icon">📁</div>
            <h3>No projects found</h3>
            <p>
              {searchTerm
                ? `No projects match "${searchTerm}"`
                : filter === 'all'
                  ? "You haven't created any projects yet"
                  : `No ${filter} projects found`}
            </p>
            <button className="create-first-project-btn">
              Create Your First Project
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <div className="project-icon">
                  {getStatusIcon(project.status)}
                </div>
                <div className="project-actions">
                  <button className="action-btn">⋯</button>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-status">
                  <span
                    className={`status-badge status-${project.status}`}
                    style={{
                      backgroundColor: `${getStatusColor(project.status)}20`,
                      color: getStatusColor(project.status),
                    }}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="project-footer">
                <div className="project-dates">
                  <div className="date-item">
                    <span className="date-label">Created:</span>
                    <span className="date-value">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Updated:</span>
                    <span className="date-value">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="project-card-actions">
                  <button className="secondary-btn">View</button>
                  <button className="primary-btn">Edit</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Progress Overview */}
      {projects.length > 0 && (
        <div className="progress-overview">
          <h2>Project Progress Overview</h2>
          <div className="progress-chart">
            <div className="progress-bar">
              <div
                className="progress-segment active"
                style={{
                  width: `${(getProjectCount('active') / projects.length) * 100}%`,
                }}
              ></div>
              <div
                className="progress-segment completed"
                style={{
                  width: `${(getProjectCount('completed') / projects.length) * 100}%`,
                }}
              ></div>
              <div
                className="progress-segment pending"
                style={{
                  width: `${(getProjectCount('pending') / projects.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="progress-legend">
              <div className="legend-item">
                <div className="legend-color active"></div>
                <span>Active ({getProjectCount('active')})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color completed"></div>
                <span>Completed ({getProjectCount('completed')})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pending"></div>
                <span>Pending ({getProjectCount('pending')})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
