import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Login, Admin, Faculty, Student, Signup, Home, AdminDashBoard, FacultyDashBoard, StudentDashBoard } from "./pages/index"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './components'
import store from './store/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signup/admin",
        element: <Admin />,
      },
      {
        path: "signup/faculty",
        element: <Faculty />,
      },
      {
        path: "signup/student",
        element: <Student />,
      },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute>
            <AdminDashBoard/>
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard/faculty",
        element: (
          <ProtectedRoute>
            <FacultyDashBoard/>
          </ProtectedRoute>
        )
      },
      {
        path: "dashboard/student",
        element: (
          <ProtectedRoute>
            <StudentDashBoard/>
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
