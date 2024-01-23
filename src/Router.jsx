import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./pages/Posts";
import UserForm from "./pages/userForm/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
