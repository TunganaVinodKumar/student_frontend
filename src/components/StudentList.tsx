import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  RefreshCw, 
  UserPlus, 
  Mail, 
  Phone, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import type { Student } from '../types/student';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onNavigateToRegister: () => void;
  onRefresh?: () => void;
  onSeedDatabase?: () => void;
  isLoading?: boolean;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  onSelectStudent,
  onDeleteStudent,
  onNavigateToRegister,
  onRefresh,
  onSeedDatabase,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  // Filter students by search term, department, and academic year
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || student.department === selectedDept;
    const matchesYear = selectedYear === 'ALL' || student.academicYear === selectedYear;

    return matchesSearch && matchesDept && matchesYear;
  });

  // Departments for dropdown filter
  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];

  return (
    <div className="students-container">
      {/* Top Action & Search Bar */}
      <div className="list-controls-card">
        <div className="controls-row">
          {/* Search Field */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by student name, admission number, roll no, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select 
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="ALL">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="filter-group">
            <GraduationCap size={16} className="filter-icon" />
            <select 
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="ALL">All Academic Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="list-action-buttons">
            {onSeedDatabase && students.length === 0 && (
              <button 
                className="btn btn-secondary-subtle" 
                onClick={onSeedDatabase}
                title="Populate PostgreSQL with 10 sample students"
                disabled={isLoading}
              >
                <Sparkles size={16} className="text-amber" />
                <span>Seed 10 Demo Students</span>
              </button>
            )}

            <button 
              className="btn btn-outline" 
              onClick={onRefresh}
              title="Refresh student list from PostgreSQL"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
              <span>Refresh</span>
            </button>

            <button 
              className="btn btn-primary" 
              onClick={onNavigateToRegister}
            >
              <UserPlus size={16} />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Count Summary Bar */}
      <div className="results-summary-bar">
        <span className="results-count">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> registered students in PostgreSQL
        </span>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="loading-state-box">
          <div className="loading-spinner"></div>
          <p>Syncing with PostgreSQL database...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        /* Empty / No Results State */
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <GraduationCap size={48} />
          </div>
          <h3>No Student Records Found</h3>
          <p>
            {searchTerm || selectedDept !== 'ALL' || selectedYear !== 'ALL'
              ? 'No students matched your active search filters. Try clearing filters.'
              : 'The PostgreSQL database currently has 0 student records.'}
          </p>
          <div className="empty-state-actions" style={{ display: 'flex', gap: '12px' }}>
            {(searchTerm || selectedDept !== 'ALL' || selectedYear !== 'ALL') ? (
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSearchTerm(''); setSelectedDept('ALL'); setSelectedYear('ALL'); }}
              >
                Clear All Filters
              </button>
            ) : (
              <>
                {onSeedDatabase && (
                  <button className="btn btn-secondary-subtle" onClick={onSeedDatabase}>
                    <Sparkles size={16} /> Load 10 Demo Students into Database
                  </button>
                )}
                <button className="btn btn-primary" onClick={onNavigateToRegister}>
                  <UserPlus size={16} /> Register First Student
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Data Table */
        <div className="table-responsive-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission & Roll No</th>
                <th>Department & Year</th>
                <th>Contact Information</th>
                <th>CGPA</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="student-row">
                  {/* Student Name & Avatar */}
                  <td>
                    <div className="student-cell">
                      <div className="student-avatar">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div className="student-cell-details">
                        <span className="student-fullname">
                          {student.firstName} {student.lastName}
                        </span>
                        <span className="student-gender-badge">
                          {student.gender} • Blood: {student.bloodGroup}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Admission & Roll */}
                  <td>
                    <div className="code-badge-group">
                      <span className="admission-code">{student.admissionNumber}</span>
                      <span className="roll-code">Roll: {student.rollNumber}</span>
                    </div>
                  </td>

                  {/* Department & Year */}
                  <td>
                    <div className="dept-cell">
                      <span className="dept-tag">{student.department}</span>
                      <span className="year-sem-text">
                        {student.academicYear} • {student.semester} (Sec {student.section})
                      </span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td>
                    <div className="contact-cell">
                      <span className="contact-item">
                        <Mail size={13} className="text-muted" /> {student.email}
                      </span>
                      <span className="contact-item">
                        <Phone size={13} className="text-muted" /> {student.phone}
                      </span>
                    </div>
                  </td>

                  {/* CGPA */}
                  <td>
                    <span className="cgpa-pill">{student.cgpa?.toFixed(1) || '0.0'}</span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="action-buttons-group">
                      <button 
                        className="btn-action view-btn"
                        onClick={() => onSelectStudent(student)}
                        title="View Full Student Profile"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>

                      <button 
                        className="btn-action delete-btn"
                        onClick={() => {
                          if (window.confirm(`Delete record for ${student.firstName} ${student.lastName} permanently from PostgreSQL?`)) {
                            onDeleteStudent(student.id);
                          }
                        }}
                        title="Delete Student from PostgreSQL"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
