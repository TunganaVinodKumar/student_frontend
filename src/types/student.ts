export type Gender = 'Male' | 'Female' | 'Other';

export type Department = 
  | 'Computer Science & Engineering'
  | 'Electronics & Communication'
  | 'Electrical & Electronics'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Information Technology';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  department: Department;
  academicYear: AcademicYear;
  parentName: string;
  parentRelation: string;
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
  department: Department;
  academicYear: AcademicYear;
  cgpa: string;
  parentName: string;
  parentRelation: string;
}
