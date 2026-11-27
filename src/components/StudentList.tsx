import React from 'react';
import {
  Eye,
  Pencil,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  GraduationCap
} from 'lucide-react';
import type { Student } from '../types/student';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onNavigateToRegister: () => void;
  isLoading?: boolean;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  onSelectStudent,
  onEditStudent,
  onDeleteStudent,
  onNavigateToRegister,
  isLoading = false
}) => {
  return (
    <div className="students-container">
      {/* Student Count Summary Bar */}
      <div className="results-summary-bar">
        <span className="results-count">
          Total <strong>{students.length}</strong> registered students
        </span>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="loading-state-box">
          <div className="loading-spinner"></div>
          <p>Syncing with PostgreSQL database...</p>
        </div>
      ) : students.length === 0 ? (
        /* Empty / No Results State */
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <GraduationCap size={48} />
          </div>
          <h3>No Student Records Found</h3>
          <p>The PostgreSQL database currently has 0 student records.</p>
          <div className="empty-state-actions">
            <button className="btn btn-primary" onClick={onNavigateToRegister}>
              <UserPlus size={16} /> Register First Student
            </button>
          </div>
        </div>
      ) : (
        /* Data Table */
        <div className="table-responsive-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department & Year</th>
                <th>Contact Information</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
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
                          {student.gender}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Department & Year */}
                  <td>
                    <div className="dept-cell">
                      <span className="dept-tag">{student.department}</span>
                      <span className="year-sem-text">
                        {student.academicYear}
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

                  {/* Actions */}
                  <td>
                    <div className="action-buttons-group">
                      <button
                        className="btn-action view-btn"
                        onClick={() => onSelectStudent(student)}
                        title="View Full Student Profile"
                      >
                        <Eye size={15} />
                        <span>View</span>
                      </button>

                      <button
                        className="btn-action edit-btn"
                        onClick={() => onEditStudent(student)}
                        title="Edit Student Information"
                      >
                        <Pencil size={15} />
                        <span>Edit</span>
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
                        <Trash2 size={15} />
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
