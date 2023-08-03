import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TaskList from './component/TaskList/TaskList.jsx'
import UpdateForm from './component/UpdateForm/UpdateForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'list',
    element: <TaskList />
  },
  {
    path: 'update/:id',
    element: <UpdateForm />,
    loader: ({ params }) => fetch(`http://localhost:5000/datas/${params.id}`)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
