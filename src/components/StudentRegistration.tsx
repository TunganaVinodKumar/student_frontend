import React, { useState } from 'react';
import { 
  UserPlus, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import type { Student, StudentFormData, Department, AcademicYear, Gender } from '../types/student';

interface StudentRegistrationProps {
  existingStudents: Student[];
  onAddStudent: (student: Student) => void;
  onNavigateToStudents: () => void;
}

const INITIAL_FORM_DATA: StudentFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: 'Male',
  bloodGroup: 'O+',
  department: 'Computer Science & Engineering',
  academicYear: '1st Year',
  semester: 'Semester 1',
  section: 'A',
  rollNumber: '',
  admissionNumber: '',
  parentName: '',
  parentRelation: 'Father',
  parentPhone: '',
  parentOccupation: '',
  address: '',
  city: '',
  state: 'Telangana',
  pincode: ''
};

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  existingStudents,
  onAddStudent,
  onNavigateToStudents
}) => {
  const [formData, setFormData] = useState<StudentFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled component input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof StudentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Pre-fill demo data for quick testing & demonstration
  const handlePrefillDemo = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFormData({
      firstName: 'Sneha',
      lastName: 'Chowdary',
      email: `sneha.c${randomSuffix}@college.edu`,
      phone: '9848022334',
      dateOfBirth: '2005-08-19',
      gender: 'Female',
      bloodGroup: 'B+',
      department: 'Computer Science & Engineering',
      academicYear: '1st Year',
      semester: 'Semester 1',
      section: 'B',
      rollNumber: `24CSE${randomSuffix}`,
      admissionNumber: `ADM-2024-${randomSuffix}`,
      parentName: 'Muralidhar Chowdary',
      parentRelation: 'Father',
      parentPhone: '9848099887',
      parentOccupation: 'Business Executive',
      address: 'Plot 45, Jubilee Hills Road No 10',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    });
    setErrors({});
  };

  // Comprehensive Form Validation (Day 3 requirement)
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

    // Admission Number (Format & Uniqueness check)
    if (!formData.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Admission number is required';
    } else {
      const isDuplicate = existingStudents.some(
        s => s.admissionNumber.trim().toLowerCase() === formData.admissionNumber.trim().toLowerCase()
      );
      if (isDuplicate) {
        newErrors.admissionNumber = 'Admission number already registered in database';
      }
    }

    // Roll Number
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Student email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Student Phone (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    // Parent Name
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
    }

    // Parent Phone
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Parent contact number is required';
    } else if (!phoneRegex.test(formData.parentPhone.replace(/[^0-9]/g, ''))) {
      newErrors.parentPhone = 'Enter a valid 10-digit mobile number';
    }

    // Date of birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler (Day 3 requirement: onSubmit, prevent duplicate submissions)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top of form smoothly to see errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API network call delay (like calling Spring Boot POST /api/students)
    setTimeout(() => {
      const newStudent: Student = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        cgpa: 8.5,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      onAddStudent(newStudent);
      setIsSubmitting(false);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    }, 700);
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
              Complete the verified multi-section form to enroll a student record into the institutional database.
            </p>
          </div>
        </div>

        <div className="reg-header-actions">
          <button 
            type="button" 
            className="btn btn-secondary-subtle"
            onClick={handlePrefillDemo}
            title="Auto-fill sample data for rapid testing"
          >
            <Sparkles size={16} className="text-amber" />
            <span>Pre-fill Demo Data</span>
          </button>

          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => { setFormData(INITIAL_FORM_DATA); setErrors({}); }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
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

            {/* Gender Radio Buttons (Day 3 requirement: radio buttons) */}
            <div className="form-group">
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

            {/* Blood Group Dropdown */}
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select 
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="form-input"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Academic & Department Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">2</div>
            <div>
              <h3 className="section-heading">Academic & Enrollment Details</h3>
              <p className="section-subtext">Branch allocation and institutional identifiers</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Admission Number */}
            <div className="form-group">
              <label className="form-label required">Admission Number</label>
              <input 
                type="text" 
                name="admissionNumber"
                placeholder="e.g. ADM-2024-007"
                value={formData.admissionNumber}
                onChange={handleChange}
                className={`form-input font-mono ${errors.admissionNumber ? 'input-error' : ''}`}
              />
              {errors.admissionNumber && <span className="error-text">{errors.admissionNumber}</span>}
              <span className="field-hint">Must be unique institutional format</span>
            </div>

            {/* Roll Number */}
            <div className="form-group">
              <label className="form-label required">Class Roll Number</label>
              <input 
                type="text" 
                name="rollNumber"
                placeholder="e.g. 24CSE089"
                value={formData.rollNumber}
                onChange={handleChange}
                className={`form-input font-mono ${errors.rollNumber ? 'input-error' : ''}`}
              />
              {errors.rollNumber && <span className="error-text">{errors.rollNumber}</span>}
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <label className="form-label required">Department / Branch</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
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
                className="form-input"
              >
                {academicYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="form-group">
              <label className="form-label required">Current Semester</label>
              <select 
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-input"
              >
                {[
                  'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
                  'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'
                ].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div className="form-group">
              <label className="form-label required">Section</label>
              <select 
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="form-input"
              >
                {['A', 'B', 'C', 'D'].map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Parent / Guardian Information */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">3</div>
            <div>
              <h3 className="section-heading">Parent & Guardian Information</h3>
              <p className="section-subtext">Emergency contacts and family details</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Guardian Name */}
            <div className="form-group">
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
                className="form-input"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>

            {/* Parent Phone */}
            <div className="form-group">
              <label className="form-label required">Emergency Contact Phone</label>
              <input 
                type="tel" 
                name="parentPhone"
                placeholder="e.g. 9876500000"
                value={formData.parentPhone}
                onChange={handleChange}
                maxLength={10}
                className={`form-input ${errors.parentPhone ? 'input-error' : ''}`}
              />
              {errors.parentPhone && <span className="error-text">{errors.parentPhone}</span>}
            </div>

            {/* Parent Occupation */}
            <div className="form-group">
              <label className="form-label">Occupation / Profession</label>
              <input 
                type="text" 
                name="parentOccupation"
                placeholder="e.g. Government Officer, Engineer"
                value={formData.parentOccupation}
                onChange={handleChange}
                className="form-input"
              >
              </input>
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Residential Address */}
        <div className="form-section-card">
          <div className="form-section-header">
            <div className="section-number-badge">4</div>
            <div>
              <h3 className="section-heading">Contact & Residential Address</h3>
              <p className="section-subtext">Direct communication channels</p>
            </div>
          </div>

          <div className="form-grid-3">
            {/* Email */}
            <div className="form-group">
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

            {/* City */}
            <div className="form-group">
              <label className="form-label required">City</label>
              <input 
                type="text" 
                name="city"
                placeholder="e.g. Hyderabad"
                value={formData.city}
                onChange={handleChange}
                className={`form-input ${errors.city ? 'input-error' : ''}`}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            {/* Street Address */}
            <div className="form-group col-span-2">
              <label className="form-label required">Street / House Address</label>
              <input 
                type="text" 
                name="address"
                placeholder="e.g. Flat 301, Sri Sai Residency, Madhapur"
                value={formData.address}
                onChange={handleChange}
                className={`form-input ${errors.address ? 'input-error' : ''}`}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label className="form-label required">Postal Pincode</label>
              <input 
                type="text" 
                name="pincode"
                placeholder="e.g. 500081"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                className={`form-input ${errors.pincode ? 'input-error' : ''}`}
              />
              {errors.pincode && <span className="error-text">{errors.pincode}</span>}
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
              className="btn btn-secondary"
              onClick={onNavigateToStudents}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button 
              type="submit" 
              className="btn btn-primary-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="button-spinner"></div>
                  <span>Enrolling Student...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit & Register Student</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
