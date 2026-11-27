import React from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Users, 
  Mail,
  FileCheck2
} from 'lucide-react';
import type { Student } from '../types/student';

interface StudentDetailsModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ 
  student, 
  onClose 
}) => {
  if (!student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-profile-summary">
            <div className="modal-avatar">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <div className="modal-title-row">
                <h2 className="modal-student-name">
                  {student.firstName} {student.lastName}
                </h2>
              </div>
              <p className="modal-subtitle">
                ID #{student.id} • {student.department}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close window">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Sections */}
        <div className="modal-body">
          <div className="modal-sections-grid">
            {/* Section 1: Personal Details */}
            <div className="detail-section-card">
              <div className="section-title">
                <User size={18} className="text-primary" />
                <h3>Personal Information</h3>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{student.firstName} {student.lastName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Date of Birth:</span>
                  <span className="info-value">{student.dateOfBirth}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{student.gender}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Academic Details */}
            <div className="detail-section-card">
              <div className="section-title">
                <GraduationCap size={18} className="text-primary" />
                <h3>Academic & Branch Details</h3>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Department:</span>
                  <span className="info-value font-semibold">{student.department}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Academic Year:</span>
                  <span className="info-value">{student.academicYear}</span>
                </div>
              </div>
            </div>

            {/* Section 3: Parent / Guardian Details */}
            <div className="detail-section-card">
              <div className="section-title">
                <Users size={18} className="text-primary" />
                <h3>Parent / Guardian Information</h3>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Guardian Name:</span>
                  <span className="info-value">{student.parentName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Relationship:</span>
                  <span className="info-value">{student.parentRelation}</span>
                </div>
              </div>
            </div>

            {/* Section 4: Contact Details */}
            <div className="detail-section-card">
              <div className="section-title">
                <Mail size={18} className="text-primary" />
                <h3>Contact Information</h3>
              </div>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Student Email:</span>
                  <span className="info-value text-blue">{student.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Student Mobile:</span>
                  <span className="info-value">{student.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-footer-left">
            <span className="verification-status">
              <FileCheck2 size={16} className="text-green" /> Verified Institutional Record
            </span>
          </div>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
