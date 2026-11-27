import React from 'react';

interface HeaderProps {
  activeTab: 'students' | 'register';
  totalStudents?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div>
          <h1 className="page-title">
            {activeTab === 'students' && 'Student Dashboard'}
            {activeTab === 'register' && 'New Student Registration'}
          </h1>
          <p className="page-subtitle">
            College Management
          </p>
        </div>
      </div>
    </header>
  );
};
