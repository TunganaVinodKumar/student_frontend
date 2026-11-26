import type { Student, StudentFormData } from '../types/student';

const API_BASE_URL = 'http://localhost:8080/api/students';

// Fetch all students from PostgreSQL via Spring Boot
export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.statusText}`);
  }
  return response.json();
};

// Fetch single student by ID
export const getStudentById = async (id: number): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Student not found: ${response.statusText}`);
  }
  return response.json();
};

// Create / Register new student into PostgreSQL
export const createStudent = async (studentData: Omit<Student, 'id'> | StudentFormData): Promise<Student> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to register student');
  }

  return response.json();
};

// Delete student permanently from PostgreSQL
export const removeStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete student: ${response.statusText}`);
  }
};

// Seed initial sample students into PostgreSQL one by one
export const seedInitialStudents = async (initialStudents: Student[]): Promise<Student[]> => {
  const savedList: Student[] = [];
  for (const student of initialStudents) {
    const { id, ...studentPayload } = student;
    try {
      const saved = await createStudent(studentPayload);
      savedList.push(saved);
    } catch (e) {
      console.warn('Skipping existing student during seeding:', student.admissionNumber);
    }
  }
  return savedList;
};
