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

// Update existing student in PostgreSQL via Spring Boot PUT /api/students/{id}
export const updateStudent = async (id: number, studentData: Partial<Student> | StudentFormData): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update student');
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
