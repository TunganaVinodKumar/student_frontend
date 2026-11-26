import React from 'react';
import { Bell, Calendar, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  totalStudents: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, totalStudents }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <div>
          <h1 className="page-title">
            {activeTab === 'dashboard' && 'Academic Dashboard'}
            {activeTab === 'students' && 'Student Records Directory'}
            {activeTab === 'register' && 'New Student Registration'}
          </h1>
          <p className="page-subtitle">
            Sri Vaatsalya Institute of Technology & Engineering • ERP Portal
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-badge">
          <Calendar size={16} className="text-primary" />
          <span>{today}</span>
        </div>

        <div className="header-badge live-badge">
          <span className="pulsing-dot"></span>
          <span>{totalStudents} Active Students</span>
        </div>

        <button className="icon-button notification-btn" title="System Notifications">
          <Bell size={18} />
          <span className="notification-indicator">2</span>
        </button>

        <div className="user-profile">
          <div className="avatar-circle">
            <span>VK</span>
          </div>
          <div className="user-meta">
            <span className="user-name">Vinod Kumar</span>
            <span className="user-role">
              <ShieldCheck size={12} className="inline mr-1" />
              Academic Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
