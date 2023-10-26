import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import Home from './Components/Home';
import TeacherList from './Components/TeacherList';
import Profile from './Components/Profile';
import ResultDisplay from './Components/ResultDisplay';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: "/teachers",
    element:<TeacherList></TeacherList>
  },
  {
    path: "/teachers/:id",
    element:<Profile></Profile>
  },
  {
    path: "result",
    element:<ResultDisplay></ResultDisplay>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

