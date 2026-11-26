import React, { useState } from 'react';
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
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'register'>('dashboard');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Add new student (Day 3 feature)
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    setToast({
      id: String(Date.now()),
      type: 'success',
      title: 'Registration Successful!',
      message: `${newStudent.firstName} ${newStudent.lastName} (${newStudent.admissionNumber}) enrolled in ${newStudent.department}.`
    });
    // Navigate user to student directory to view the new record immediately
    setActiveTab('students');
  };

  // Delete student record
  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    setToast({
      id: String(Date.now()),
      type: 'info',
      title: 'Record Deleted',
      message: studentToDelete 
        ? `Student record for ${studentToDelete.firstName} ${studentToDelete.lastName} was removed.`
        : 'Student record deleted.'
    });
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

      {/* Student Details View Modal (Day 2) */}
      <StudentDetailsModal 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />

      {/* System Toast Notification (Day 3) */}
      <Toast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />
    </div>
  );
};

export default App;
