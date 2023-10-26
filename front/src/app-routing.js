import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import ProjectDetails from "./routes/ProjectDetails";
import ProjectForm from "./routes/ProjectForm";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/project/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/project/form",
        element: <ProjectForm />,
      },
    ],
  },
]);

export default router;
