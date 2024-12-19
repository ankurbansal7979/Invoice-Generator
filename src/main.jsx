import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
// import Invoice from './Components/Invoice.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }
  // {
  //   path: "/in",
  //   element: <Invoice></Invoice>,
  // }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
