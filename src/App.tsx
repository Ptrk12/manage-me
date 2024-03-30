import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Project from './pages/project/Project';

const Layout = () =>{
  return(
    <div className="main">
     <Project />
    </div>
  )
}

const router = createBrowserRouter([{
  path:"/",
  element:<Layout/>
}])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
