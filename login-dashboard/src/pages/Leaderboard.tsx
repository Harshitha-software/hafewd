import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dataAPI } from '../services/api';
import { LeaderboardEntry } from '../types';
import './Leaderboard.css';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await dataAPI.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'rank-gold';
      case 2:
        return 'rank-silver';
      case 3:
        return 'rank-bronze';
      default:
        return 'rank-default';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      {/* Header */}
      <div className="leaderboard-header">
        <div className="header-content">
          <h1>🏆 Leaderboard</h1>
          <p>See how you rank against other users</p>
        </div>
        <div className="user-rank-card">
          <h3>Your Position</h3>
          <div className="user-rank">
            {getRankIcon(
              leaderboard.find((entry) => entry.username === user?.username)
                ?.rank || 0
            )}
            <span>
              Rank{' '}
              {leaderboard.find((entry) => entry.username === user?.username)
                ?.rank || 'N/A'}
            </span>
          </div>
          <div className="user-score">Score: {user?.score || 0}</div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="podium-section">
        <h2>Top Performers</h2>
        <div className="podium">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div
              key={entry.id}
              className={`podium-position position-${index + 1} ${
                entry.username === user?.username ? 'current-user' : ''
              }`}
            >
              <div className="podium-rank">{getRankIcon(entry.rank)}</div>
              <div className="podium-avatar">
                {entry.username.charAt(0).toUpperCase()}
              </div>
              <div className="podium-info">
                <h3>{entry.username}</h3>
                <p>{entry.score.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="leaderboard-table-section">
        <h2>Full Rankings</h2>
        <div className="table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.id}
                  className={`${entry.username === user?.username ? 'current-user-row' : ''} ${getRankClass(entry.rank)}`}
                >
                  <td className="rank-cell">
                    <span className="rank-display">
                      {getRankIcon(entry.rank)}
                    </span>
                  </td>
                  <td className="user-cell">
                    <div className="user-info">
                      <div className="user-avatar">
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <span className="username">{entry.username}</span>
                        {entry.username === user?.username && (
                          <span className="you-badge">You</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="score-cell">
                    <span className="score">
                      {entry.score.toLocaleString()}
                    </span>
                    <span className="points-label">points</span>
                  </td>
                  <td className="badge-cell">
                    {entry.rank <= 3 && (
                      <span
                        className={`achievement-badge ${getRankClass(entry.rank)}`}
                      >
                        {entry.rank === 1 && 'Champion'}
                        {entry.rank === 2 && 'Runner-up'}
                        {entry.rank === 3 && 'Top 3'}
                      </span>
                    )}
                    {entry.rank > 3 && entry.rank <= 10 && (
                      <span className="achievement-badge top-10">Top 10</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Section */}
      <div className="leaderboard-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>Total Users</h3>
            <p>{leaderboard.length}</p>
          </div>
          <div className="stat-item">
            <h3>Highest Score</h3>
            <p>{leaderboard[0]?.score.toLocaleString() || 0}</p>
          </div>
          <div className="stat-item">
            <h3>Average Score</h3>
            <p>
              {Math.round(
                leaderboard.reduce((sum, entry) => sum + entry.score, 0) /
                  leaderboard.length
              ).toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
