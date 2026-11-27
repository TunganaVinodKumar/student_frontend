import React, { useState } from 'react';
import { 
  UserPlus, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import type { Student, StudentFormData, Department, AcademicYear, Gender } from '../types/student';

interface StudentRegistrationProps {
  onAddStudent: (student: Omit<Student, 'id'>) => Promise<boolean | void> | void;
  onNavigateToStudents: () => void;
}

const INITIAL_FORM_DATA: StudentFormData = {
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
};

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  onAddStudent,
  onNavigateToStudents
}) => {
  const [formData, setFormData] = useState<StudentFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled component input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof StudentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Minimum 2 characters required';
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Date of Birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Student Phone
    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Mobile number must be exactly 10 digits';
    }

    // Parent Name
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent / Guardian name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddStudent({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        department: formData.department,
        academicYear: formData.academicYear,
        parentName: formData.parentName.trim(),
        parentRelation: formData.parentRelation
      });
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    } catch (err) {
      console.error(err);
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
    <div className="registration-container">
      {/* Form Page Header */}
      <div className="registration-header-card">
        <div className="reg-title-group">
          <div className="reg-icon-wrapper">
            <UserPlus size={26} className="text-primary" />
          </div>
          <div>
            <h2 className="reg-main-title">Student Admission & Registration</h2>
            <p className="reg-sub-title">
              Complete the form to enroll a student record into the institutional database.
            </p>
          </div>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="student-form" noValidate>
        {/* Section 1: Personal Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">1</div>
            <div>
              <h3 className="section-heading">Personal Information</h3>
              <p className="section-subtext">Basic identification and personal profile</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* First Name */}
            <div className="form-group">
              <label className="form-label required">First Name</label>
              <input 
                type="text" 
                name="firstName"
                placeholder="e.g. Rahul"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? 'input-error' : ''}`}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="form-label required">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                placeholder="e.g. Varma"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? 'input-error' : ''}`}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label className="form-label required">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`form-input ${errors.dateOfBirth ? 'input-error' : ''}`}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>

            {/* Gender Radio Buttons */}
            <div className="form-group col-span-2">
              <label className="form-label required">Gender</label>
              <div className="radio-group-horizontal">
                {(['Male', 'Female', 'Other'] as Gender[]).map(g => (
                  <label key={g} className={`radio-label ${formData.gender === g ? 'radio-selected' : ''}`}>
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

        {/* Section 2: Academic & Department Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">2</div>
            <div>
              <h3 className="section-heading">Academic & Enrollment Details</h3>
              <p className="section-subtext">Branch allocation and academic performance</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Department Dropdown */}
            <div className="form-group">
              <label className="form-label required">Department / Branch</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div className="form-group">
              <label className="form-label required">Academic Year</label>
              <select 
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className="form-select"
              >
                {academicYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Parent & Guardian Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">3</div>
            <div>
              <h3 className="section-heading">Parent & Guardian Information</h3>
              <p className="section-subtext">Family details</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Guardian Name */}
            <div className="form-group col-span-2">
              <label className="form-label required">Parent / Guardian Name</label>
              <input 
                type="text" 
                name="parentName"
                placeholder="e.g. Suresh Varma"
                value={formData.parentName}
                onChange={handleChange}
                className={`form-input ${errors.parentName ? 'input-error' : ''}`}
              />
              {errors.parentName && <span className="error-text">{errors.parentName}</span>}
            </div>

            {/* Relation */}
            <div className="form-group">
              <label className="form-label required">Relationship</label>
              <select 
                name="parentRelation"
                value={formData.parentRelation}
                onChange={handleChange}
                className="form-select"
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
          <div className="form-section-header">
            <div className="section-number-badge">4</div>
            <div>
              <h3 className="section-heading">Contact Information</h3>
              <p className="section-subtext">Direct communication channels</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Email */}
            <div className="form-group col-span-2">
              <label className="form-label required">Student Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="e.g. rahul.varma@college.edu"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label required">Student Mobile Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* Form Submission Bar */}
        <div className="form-submit-bar">
          <div className="form-submit-info">
            <ShieldCheck size={18} className="text-green" />
            <span>All entries will be verified and permanently registered in the institutional student records.</span>
          </div>

          <div className="form-submit-actions">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onNavigateToStudents}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
