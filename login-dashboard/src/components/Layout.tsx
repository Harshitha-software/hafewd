import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="sidebar-close" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link
            to="/dashboard/leaderboard"
            className={`nav-item ${isActive('/dashboard/leaderboard') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🏆</span>
            Leaderboard
          </Link>
          <Link
            to="/dashboard/projects"
            className={`nav-item ${isActive('/dashboard/projects') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📁</span>
            Projects
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button>
            <h1 className="header-title">
              {location.pathname === '/dashboard' && 'Home'}
              {location.pathname === '/dashboard/leaderboard' && 'Leaderboard'}
              {location.pathname === '/dashboard/projects' && 'Projects'}
            </h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="user-score">Score: {user?.score || 0}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
