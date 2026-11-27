import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  User, 
  GraduationCap, 
  Users, 
  Loader2,
  CheckCircle2,
  AlertCircle
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
  const [activeTab, setActiveTab] = useState<'academic' | 'personal' | 'contact'>('academic');
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    academicYear: '1st Year',
    cgpa: '',
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
        cgpa: student.cgpa !== undefined && student.cgpa !== null ? String(student.cgpa) : '',
        parentName: student.parentName || '',
        parentRelation: student.parentRelation || 'Father'
      });
      setErrors({});
      setActiveTab('academic');
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

    // Personal
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

    // Academic
    if (formData.cgpa === '' || formData.cgpa === undefined) {
      newErrors.cgpa = 'CGPA is required';
    } else {
      const parsedCgpa = parseFloat(formData.cgpa);
      if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
        newErrors.cgpa = 'CGPA must be between 0.0 and 10.0';
      }
    }

    // Guardian
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent / Guardian name is required';
    }

    setErrors(newErrors);

    if (newErrors.cgpa) {
      setActiveTab('academic');
    } else if (newErrors.firstName || newErrors.lastName || newErrors.email || newErrors.phone) {
      setActiveTab('personal');
    } else if (newErrors.parentName) {
      setActiveTab('contact');
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(student.id, {
        ...formData,
        cgpa: parseFloat(formData.cgpa)
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

  const hasAcademicError = !!errors.cgpa;
  const hasPersonalError = !!(errors.firstName || errors.lastName || errors.email || errors.phone);
  const hasGuardianError = !!errors.parentName;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card modal-edit-card" 
        onClick={(e) => e.stopPropagation()}
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

        {/* Navigation Tabs Header */}
        <div className="modal-tabs-header">
          <button 
            type="button"
            className={`modal-tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            <GraduationCap size={17} />
            <span>Academic Details</span>
            {hasAcademicError && <AlertCircle size={14} className="text-danger" />}
          </button>

          <button 
            type="button"
            className={`modal-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={17} />
            <span>Personal Profile</span>
            {hasPersonalError && <AlertCircle size={14} className="text-danger" />}
          </button>

          <button 
            type="button"
            className={`modal-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Users size={17} />
            <span>Parent & Guardian</span>
            {hasGuardianError && <AlertCircle size={14} className="text-danger" />}
          </button>
        </div>

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-tab-content">
            
            {/* TAB 1: ACADEMIC */}
            {activeTab === 'academic' && (
              <div className="tab-pane">
                <div className="edit-section-header">
                  <div>
                    <h3>Institutional & Academic Information</h3>
                    <p>Manage branch allocation, academic year, and CGPA</p>
                  </div>
                </div>

                <div className="edit-grid-2">
                  <div className="form-group edit-col-span-2">
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

                  <div className="form-group">
                    <label className="form-label required">Cumulative GPA (0.0 - 10.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      name="cgpa"
                      className={`form-input ${errors.cgpa ? 'input-error' : ''}`}
                      value={formData.cgpa}
                      onChange={handleChange}
                      placeholder="e.g. 8.5"
                    />
                    {errors.cgpa && <span className="error-text">{errors.cgpa}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PERSONAL PROFILE */}
            {activeTab === 'personal' && (
              <div className="tab-pane">
                <div className="edit-section-header">
                  <div>
                    <h3>Student Personal Profile</h3>
                    <p>Basic personal details, date of birth, contact details, and gender</p>
                  </div>
                </div>

                <div className="edit-grid-2">
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
            )}

            {/* TAB 3: PARENT / GUARDIAN */}
            {activeTab === 'contact' && (
              <div className="tab-pane">
                <div className="edit-section-header">
                  <div>
                    <h3>Parent / Guardian Information</h3>
                    <p>Emergency contact and family details</p>
                  </div>
                </div>

                <div className="edit-grid-2">
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
            )}

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
