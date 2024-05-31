import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Project from "./pages/project/Project";
import Task from "./pages/Task/Task";
import { Button } from "@mui/material";
import UserStory from "./pages/UserSotires/UserStory";
import TaskList from "./pages/taskList/TaskList";
import Backlog from "./pages/Backlog/Backlog";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/login/LoginPage";
import Logout from './components/Logout/Logout';
import Notifications from "./pages/Notifications/Notifications";
import { Observable } from "rxjs";
import Navbar from "./components/navbar/Navbar";

const Layout = () => {

  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer"></div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "projects",
        element: <Project />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "projects/:id",
        element: <UserStory />,
      },
      {
        path: "projects/:projectId/userstory/:userStoryId/createtask",
        element: <Task />,
      },
      {
        path: "projects/:projectId/userstory/:userStoryId/tasklist",
        element: <TaskList />,
      },
      {
        path: "projects/:projectId/backlog",
        element: <Backlog />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
