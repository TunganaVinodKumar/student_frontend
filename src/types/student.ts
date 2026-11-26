export type Gender = 'Male' | 'Female' | 'Other';

export type Department = 
  | 'Computer Science & Engineering'
  | 'Electronics & Communication'
  | 'Electrical & Electronics'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Information Technology';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export type StudentStatus = 'Active' | 'Graduated' | 'Suspended';

export interface Student {
  id: number;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: string;
  department: Department;
  academicYear: AcademicYear;
  semester: string;
  section: string;
  rollNumber: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentOccupation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: StudentStatus;
  cgpa: number;
  joinedDate: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: string;
  department: Department;
  academicYear: AcademicYear;
  semester: string;
  section: string;
  rollNumber: string;
  admissionNumber: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentOccupation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  departmentsCount: number;
  newAdmissionsCount: number;
  departmentDistribution: { name: string; count: number; percentage: number }[];
}
