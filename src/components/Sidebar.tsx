import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  GraduationCap, 
  BookOpen, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'students' | 'register';
  setActiveTab: (tab: 'dashboard' | 'students' | 'register') => void;
  studentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  studentCount 
}) => {
  return (
    <aside className="app-sidebar">
      <div className="brand-header">
        <div className="brand-logo-container">
          <GraduationCap className="brand-icon" size={28} />
        </div>
        <div className="brand-text">
          <h2 className="brand-name">College</h2>
          <span className="brand-tagline">Student Information System</span>
        </div>
      </div>

      <nav className="nav-menu">
        <div className="nav-section-label">MAIN NAVIGATION</div>

        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span className="nav-label">Dashboard</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <Users size={20} />
          <span className="nav-label">Student Directory</span>
          <span className="nav-count-badge">{studentCount}</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          <UserPlus size={20} />
          <span className="nav-label">Registration</span>
        </button>

        <div className="nav-section-label">ACADEMICS (COMING SOON)</div>

        <div className="nav-item disabled">
          <BookOpen size={20} />
          <span className="nav-label">Courses & Exams</span>
        </div>

        <div className="nav-item disabled">
          <Settings size={20} />
          <span className="nav-label">Settings</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="system-status-box">
          <div className="status-header">
            <span className="status-indicator-green"></span>
            <span className="status-title">System Online</span>
          </div>
          <p className="status-desc">
            Spring Boot: Ready for Integration
          </p>
        </div>
      </div>
    </aside>
  );
};
