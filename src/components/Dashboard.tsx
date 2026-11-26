import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  ArrowUpRight, 
  PlusCircle, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import type { Student } from '../types/student';

interface DashboardProps {
  students: Student[];
  onNavigateToStudents: () => void;
  onNavigateToRegister: () => void;
  onViewStudentDetails: (student: Student) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  onNavigateToStudents,
  onNavigateToRegister,
  onViewStudentDetails
}) => {
  const totalStudents = students.length;

  // Calculate department breakdown
  const departmentCounts: { [key: string]: number } = {};
  students.forEach(s => {
    departmentCounts[s.department] = (departmentCounts[s.department] || 0) + 1;
  });

  const departmentList = Object.entries(departmentCounts).map(([name, count]) => ({
    name,
    count,
    percentage: totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  const totalDepartments = Object.keys(departmentCounts).length;

  // Most recent students first (newest IDs at top)
  const recentStudents = [...students].sort((a, b) => b.id - a.id).slice(0, 5);

  // Average CGPA
  const avgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / (students.length || 1)).toFixed(1);

  return (
    <div className="dashboard-content">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-info">
          <h2>Welcome to College ERP & Academic Portal</h2>
          <p>
            Track student admissions, view department enrollments, and manage institutional records in real-time.
          </p>
          <div className="banner-actions">
            <button className="btn btn-primary" onClick={onNavigateToRegister}>
              <PlusCircle size={18} />
              <span>Register New Student</span>
            </button>
          </div>
        </div>
        <div className="banner-decoration">
          <GraduationCap size={140} className="banner-cap-icon" />
        </div>
      </div>

      {/* KPI Stats Cards (Day 1 Feature) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle text-blue">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Registered</span>
            <div className="stat-value-group">
              <span className="stat-value">{totalStudents}</span>
              <span className="stat-trend trend-positive">
                <TrendingUp size={14} /> +12%
              </span>
            </div>
            <span className="stat-footnote">All verified enrollments</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-green-subtle text-green">
            <UserCheck size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Enrolled Batches</span>
            <div className="stat-value-group">
              <span className="stat-value">4 Years</span>
              <span className="stat-badge">UG Program</span>
            </div>
            <span className="stat-footnote">1st Year to 4th Year</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-purple-subtle text-purple">
            <Building2 size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Departments</span>
            <div className="stat-value-group">
              <span className="stat-value">{totalDepartments || 6}</span>
              <span className="stat-trend">Accredited</span>
            </div>
            <span className="stat-footnote">B.Tech & Eng Branches</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-amber-subtle text-amber">
            <Award size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Institutional Avg CGPA</span>
            <div className="stat-value-group">
              <span className="stat-value">{avgCgpa} / 10.0</span>
              <span className="stat-trend trend-positive">High</span>
            </div>
            <span className="stat-footnote">Current semester average</span>
          </div>
        </div>
      </div>

      {/* Grid: Department Distribution & Recent Student Registrations */}
      <div className="dashboard-columns">
        {/* Department Distribution */}
        <div className="card dashboard-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Department Enrollments</h3>
              <p className="card-subtitle">Distribution of enrolled students by branch</p>
            </div>
            <span className="badge-outline">{departmentList.length} Active Branches</span>
          </div>

          <div className="card-body">
            <div className="department-progress-list">
              {departmentList.map(dept => (
                <div key={dept.name} className="dept-progress-item">
                  <div className="dept-progress-header">
                    <span className="dept-name">{dept.name}</span>
                    <span className="dept-stats">
                      <strong>{dept.count}</strong> students ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.max(dept.percentage, 8)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="card dashboard-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Admissions</h3>
              <p className="card-subtitle">Latest enrolled student profiles</p>
            </div>
            <button className="text-button" onClick={onNavigateToStudents}>
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="card-body">
            <div className="recent-students-list">
              {recentStudents.map(student => (
                <div 
                  key={student.id} 
                  className="recent-student-item"
                  onClick={() => onViewStudentDetails(student)}
                >
                  <div className="student-avatar-small">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <div className="student-info-brief">
                    <span className="student-name-strong">
                      {student.firstName} {student.lastName}
                    </span>
                    <span className="student-branch-muted">
                      {student.admissionNumber} • {student.department}
                    </span>
                  </div>
                  <div className="student-item-right">
                    <span className="badge-pill-soft">{student.academicYear}</span>
                    <button className="icon-action-button" title="View details">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
