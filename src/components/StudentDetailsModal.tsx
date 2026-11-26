import React from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  MapPin, 
  Users, 
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
                <span className="badge-pill-success">{student.status}</span>
              </div>
              <p className="modal-subtitle">
                {student.admissionNumber} • Roll: {student.rollNumber} • {student.department}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close window">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Sections */}
        <div className="modal-body">
          {/* Top Quick Highlights Banner */}
          <div className="modal-highlights-grid">
            <div className="highlight-pill">
              <span className="highlight-label">Academic Year</span>
              <span className="highlight-val">{student.academicYear}</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-label">Current Semester</span>
              <span className="highlight-val">{student.semester}</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-label">Class Section</span>
              <span className="highlight-val">Section {student.section}</span>
            </div>
            <div className="highlight-pill">
              <span className="highlight-label">Cumulative GPA</span>
              <span className="highlight-val text-primary-strong">{student.cgpa} / 10.0</span>
            </div>
          </div>

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
                <div className="info-row">
                  <span className="info-label">Blood Group:</span>
                  <span className="info-value">{student.bloodGroup}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Enrollment Date:</span>
                  <span className="info-value">{student.joinedDate}</span>
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
                  <span className="info-label">Admission Number:</span>
                  <span className="info-value text-primary font-mono">{student.admissionNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Class Roll No:</span>
                  <span className="info-value font-mono">{student.rollNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Year & Semester:</span>
                  <span className="info-value">{student.academicYear} • {student.semester}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Section:</span>
                  <span className="info-value">Section {student.section}</span>
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
                  <span className="info-value">{student.parentName} ({student.parentRelation})</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Occupation:</span>
                  <span className="info-value">{student.parentOccupation || 'Not Specified'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Emergency Phone:</span>
                  <span className="info-value text-blue">{student.parentPhone}</span>
                </div>
              </div>
            </div>

            {/* Section 4: Contact & Residential Details */}
            <div className="detail-section-card">
              <div className="section-title">
                <MapPin size={18} className="text-primary" />
                <h3>Contact & Residential Address</h3>
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
                <div className="info-row">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{student.address}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">City, State:</span>
                  <span className="info-value">{student.city}, {student.state}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Postal Pincode:</span>
                  <span className="info-value">{student.pincode}</span>
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
