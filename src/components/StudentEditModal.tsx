import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  User, 
  GraduationCap, 
  Users, 
  Mail,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import type { 
  Student, 
  StudentFormData, 
  Department, 
  AcademicYear, 
  Gender 
} from '../types/student';

interface StudentEditModalProps {
  student: Student | null;
  onClose: () => void;
  onSave: (id: number, updatedData: Partial<Student>) => Promise<void>;
  existingStudents: Student[];
}

export const StudentEditModal: React.FC<StudentEditModalProps> = ({
  student,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    academicYear: '1st Year',
    parentName: '',
    parentRelation: 'Father'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phone: student.phone || '',
        dateOfBirth: student.dateOfBirth || '',
        gender: student.gender || 'Male',
        department: student.department || 'Computer Science & Engineering',
        academicYear: student.academicYear || '1st Year',
        parentName: student.parentName || '',
        parentRelation: student.parentRelation || 'Father'
      });
      setErrors({});
    }
  }, [student]);

  if (!student) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof StudentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Must be exactly 10 digits';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent / Guardian name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(student.id, {
        ...formData
      });
      onClose();
    } catch (err) {
      console.error('Failed to update student:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments: Department[] = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];

  const academicYears: AcademicYear[] = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year'
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card modal-edit-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-profile-summary">
            <div className="modal-avatar">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <div className="modal-title-row">
                <h2 className="modal-student-name">
                  Edit Student: {student.firstName} {student.lastName}
                </h2>
              </div>
              <p className="modal-subtitle">
                ID #{student.id} • Real-time PostgreSQL Update
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Cancel and close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body" style={{ overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Section 1: Personal Details */}
            <div className="form-section-card">
              <div className="section-title">
                <User size={18} className="text-primary" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Personal Information</h3>
              </div>
              <div className="edit-grid-2" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label className="form-label required">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav"
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-input"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Gender</label>
                  <div className="radio-group-horizontal" style={{ padding: '4px 0' }}>
                    {(['Male', 'Female', 'Other'] as Gender[]).map(g => (
                      <label 
                        key={g} 
                        className={`radio-label ${formData.gender === g ? 'radio-selected' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <input 
                          type="radio" 
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Academic Details */}
            <div className="form-section-card">
              <div className="section-title">
                <GraduationCap size={18} className="text-primary" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Academic & Enrollment Details</h3>
              </div>
              <div className="edit-grid-2" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label className="form-label required">Department / Branch</label>
                  <select
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label required">Academic Year</label>
                  <select
                    name="academicYear"
                    className="form-select"
                    value={formData.academicYear}
                    onChange={handleChange}
                  >
                    {academicYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Parent / Guardian */}
            <div className="form-section-card">
              <div className="section-title">
                <Users size={18} className="text-primary" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Parent & Guardian Information</h3>
              </div>
              <div className="edit-grid-2" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label className="form-label required">Parent / Guardian Name</label>
                  <input
                    type="text"
                    name="parentName"
                    className={`form-input ${errors.parentName ? 'input-error' : ''}`}
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Full name of parent/guardian"
                  />
                  {errors.parentName && <span className="error-text">{errors.parentName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Relationship</label>
                  <select
                    name="parentRelation"
                    className="form-select"
                    value={formData.parentRelation}
                    onChange={handleChange}
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Contact Information */}
            <div className="form-section-card">
              <div className="section-title">
                <Mail size={18} className="text-primary" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Contact Information</h3>
              </div>
              <div className="edit-grid-2" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label className="form-label required">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@college.edu"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer with Actions */}
          <div className="modal-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '0.84rem', fontWeight: 500 }}>
              <CheckCircle2 size={16} />
              <span>Direct PostgreSQL connection</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spinning" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
