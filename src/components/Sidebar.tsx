import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'students' | 'register';
  setActiveTab: (tab: 'students' | 'register') => void;
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

        <button 
          className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <LayoutDashboard size={20} />
          <span className="nav-label">Student Dashboard</span>
          <span className="nav-count-badge">{studentCount}</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          <UserPlus size={20} />
          <span className="nav-label">Registration</span>
        </button>
      </nav>
    </aside>
  );
};
