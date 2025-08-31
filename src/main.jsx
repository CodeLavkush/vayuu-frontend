import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  Login,
  Admin,
  Faculty,
  Student,
  Signup,
  Home,
  AdminDashboard,
  FacultyDashboard,
  StudentDashboard,
  Dashboard,
} from './pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { AdminInfo, AdminDeparments, AdminCourses, AdminExams, AdminNotice, AdminResults } from './components/dashboard/admin';
import { FacultyInfo, FacultyExams, FacultyResults, FacultySubjects, FacultyNotice, FacultyStudents } from './components/dashboard/faculty';
import { StudentInfo, StudentExams, StudentResults, StudentSubjects, StudentNotice } from './components/dashboard/student';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signup/admin',
        element: <Admin />,
      },
      {
        path: 'signup/faculty',
        element: <Faculty />,
      },
      {
        path: 'signup/student',
        element: <Student />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'admin',
            element: (
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/info",
            element: (
              <ProtectedRoute>
                <AdminInfo/>
              </ProtectedRoute>
            )
          },
          {
            path: "admin/deparments",
            element: (
              <ProtectedRoute>
                <AdminDeparments/>
              </ProtectedRoute>
            )
          },
          {
            path: "admin/courses",
            element: (
              <ProtectedRoute>
                <AdminCourses/>
              </ProtectedRoute>
            )
          },
          {
            path: "admin/exams",
            element: (
              <ProtectedRoute>
                <AdminExams/>
              </ProtectedRoute>
            )
          },
          {
            path: "admin/results",
            element: (
              <ProtectedRoute>
                <AdminResults/>
              </ProtectedRoute>
            )
          },
          {
            path: "admin/notice",
            element: (
              <ProtectedRoute>
                <AdminNotice/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty",
            element: (
              <ProtectedRoute>
                <FacultyDashboard/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/info",
            element: (
              <ProtectedRoute>
                <FacultyInfo/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/students",
            element: (
              <ProtectedRoute>
                <FacultyStudents/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/exams",
            element: (
              <ProtectedRoute>
                <FacultyExams/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/Notice",
            element: (
              <ProtectedRoute>
                <FacultyNotice/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/results",
            element: (
              <ProtectedRoute>
                <FacultyResults/>
              </ProtectedRoute>
            )
          },
          {
            path: "faculty/subjects",
            element: (
              <ProtectedRoute>
                <FacultySubjects/>
              </ProtectedRoute>
            )
          },
          {
            path: "student",
            element: (
              <ProtectedRoute>
                <StudentDashboard/>
              </ProtectedRoute>
            )
          },
          {
            path: "student/info",
            element: (
              <ProtectedRoute>
                <StudentInfo/>
              </ProtectedRoute>
            )
          },
          {
            path: "student/exams",
            element: (
              <ProtectedRoute>
                <StudentExams/>
              </ProtectedRoute>
            )
          },
          {
            path: "student/subjects",
            element: (
              <ProtectedRoute>
                <StudentSubjects/>
              </ProtectedRoute>
            )
          },
          {
            path: "student/results",
            element: (
              <ProtectedRoute>
                <StudentResults/>
              </ProtectedRoute>
            )
          },
          {
            path: "student/notice",
            element: (
              <ProtectedRoute>
                <StudentNotice/>
              </ProtectedRoute>
            )
          },
        ]
      },
      {
        path: '*',
        element: <div>Page not found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
