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
        path: "/projects/:id/createtask",
        element: <Task />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
