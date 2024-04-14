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

const Layout = () => {
  return (
    <div className="main">
      <Link to={`/`}>
        <Button variant="contained">HOME</Button>
      </Link>
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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Project />,
      },
      {
        path: "/projects/:id",
        element: <UserStory />,
      },
      {
        path: "/projects/:projectId/userstory/:userStoryId/createtask",
        element: <Task />,
      },
      {
        path: "/projects/:projectId/userstory/:userStoryId/tasklist",
        element: <TaskList />,
      },
      {
        path: "/projects/:projectId/backlog",
        element: <Backlog />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
