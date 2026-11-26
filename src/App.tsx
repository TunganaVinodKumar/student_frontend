import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { StudentDetailsModal } from './components/StudentDetailsModal';
import { StudentRegistration } from './components/StudentRegistration';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { INITIAL_STUDENTS } from './data/mockStudents';
import type { Student } from './types/student';
import { 
  getStudents, 
  createStudent, 
  removeStudent, 
  seedInitialStudents 
} from './services/studentApi';
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'register'>('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch real students from Spring Boot + PostgreSQL on initial load
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err: any) {
      console.error('Failed to load students from Spring Boot:', err);
      setToast({
        id: String(Date.now()),
        type: 'error',
        title: 'Backend Connection Error',
        message: 'Could not connect to Spring Boot at http://localhost:8080. Make sure STS is running.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add new student (Calls Spring Boot POST /api/students -> saves in PostgreSQL)
  const handleAddStudent = async (newStudentData: Omit<Student, 'id'>) => {
    try {
      const savedStudent = await createStudent(newStudentData);
      setStudents(prev => [savedStudent, ...prev]);
      setToast({
        id: String(Date.now()),
        type: 'success',
        title: 'Registration Successful!',
        message: `${savedStudent.firstName} ${savedStudent.lastName} (${savedStudent.admissionNumber}) saved permanently in PostgreSQL.`
      });
      setActiveTab('students');
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: 'error',
        title: 'Registration Failed',
        message: err.message || 'Error saving student in database'
      });
      throw err;
    }
  };

  // Delete student record (Calls Spring Boot DELETE /api/students/{id} -> deletes from PostgreSQL)
  const handleDeleteStudent = async (id: number) => {
    const studentToDelete = students.find(s => s.id === id);
    try {
      await removeStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setToast({
        id: String(Date.now()),
        type: 'info',
        title: 'Record Deleted',
        message: studentToDelete 
          ? `Student ${studentToDelete.firstName} ${studentToDelete.lastName} permanently deleted from PostgreSQL database.`
          : 'Student deleted from database.'
      });
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: 'error',
        title: 'Delete Failed',
        message: err.message || 'Could not delete student from database'
      });
    }
  };

  // Seed initial 10 students into PostgreSQL database
  const handleSeedDatabase = async () => {
    setIsLoading(true);
    try {
      setToast({
        id: String(Date.now()),
        type: 'info',
        title: 'Seeding PostgreSQL...',
        message: 'Saving 10 demo student records into your database...'
      });

      const seeded = await seedInitialStudents(INITIAL_STUDENTS);
      setStudents(seeded);

      setToast({
        id: String(Date.now()),
        type: 'success',
        title: 'Database Populated!',
        message: `${seeded.length} demo students have been saved directly into PostgreSQL.`
      });
    } catch (err: any) {
      setToast({
        id: String(Date.now()),
        type: 'error',
        title: 'Seeding Failed',
        message: err.message || 'Could not seed database'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentCount={students.length} 
      />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        <Header 
          activeTab={activeTab} 
          totalStudents={students.length} 
        />

        <main className="app-content-viewport">
          {activeTab === 'dashboard' && (
            <Dashboard 
              students={students}
              onNavigateToStudents={() => setActiveTab('students')}
              onNavigateToRegister={() => setActiveTab('register')}
              onViewStudentDetails={(student) => setSelectedStudent(student)}
            />
          )}

          {activeTab === 'students' && (
            <StudentList 
              students={students}
              onSelectStudent={(student) => setSelectedStudent(student)}
              onDeleteStudent={handleDeleteStudent}
              onNavigateToRegister={() => setActiveTab('register')}
              onRefresh={loadStudents}
              onSeedDatabase={handleSeedDatabase}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'register' && (
            <StudentRegistration 
              existingStudents={students}
              onAddStudent={handleAddStudent}
              onNavigateToStudents={() => setActiveTab('students')}
            />
          )}
        </main>
      </div>

      {/* Student Details View Modal */}
      <StudentDetailsModal 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />

      {/* System Toast Notification */}
      <Toast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />
    </div>
  );
};

export default App;
