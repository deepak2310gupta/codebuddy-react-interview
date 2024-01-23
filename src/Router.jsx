import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./pages/Posts";
import UserForm from "./pages/userForm/UserForm";
import SeatBooking from "./pages/SeatBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/seat-booking",
    element: <SeatBooking />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
