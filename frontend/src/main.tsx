import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home/Home'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import {ViewSecret} from "./pages/viewSecret/ViewSecret";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/secret/:secretId",
        element: <ViewSecret />
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
