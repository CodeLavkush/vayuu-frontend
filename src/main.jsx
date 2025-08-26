import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Login, Admin, Faculty, Student, Signup, Home } from "./pages/index"
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
        path: "/",
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
