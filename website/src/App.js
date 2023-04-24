import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BasicInfo from "./pages/BasicInfo";
import Courses from "./pages/Courses";
import Financials from "./pages/Financials";
import Result from "./pages/Result";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Sidebar from "./components/SideBar";
import Departments from "./pages/Departments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Sidebar>
        <Dashboard />
      </Sidebar>
    ),
    // authRequired: true,
  },
  {
    path: "/basicinfo",
    element: (
      <Sidebar>
        <BasicInfo />
      </Sidebar>
    ),
  },
  {
    path: "/departments",
    element: (
      <Sidebar>
        <Departments />
      </Sidebar>
    ),
  },
  {
    path: "/courses",
    element: (
      <Sidebar>
        <Courses />
      </Sidebar>
    ),
  },
  {
    path: "/financials",
    element: (
      <Sidebar>
        <Financials />
      </Sidebar>
    ),
  },
  {
    path: "/result",
    element: (
      <Sidebar>
        <Result />
      </Sidebar>
    ),
  },
  {
    path: "/students",
    element: (
      <Sidebar>
        <Students/>
      </Sidebar>
    ),
  },
  {
    path: "/staff",
    element: (
      <Sidebar>
        <Staff />
      </Sidebar>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
export default App;
