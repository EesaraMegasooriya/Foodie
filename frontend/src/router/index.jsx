import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Layout with <Outlet />
import HomeSkillShare from "../pages/HomeSkillShare";
import AddLesson from "../pages/AddLesson";
import UpdateLesson from "../pages/UpdateLesson";
import AdminLessonView from "../pages/AdminLessonView";
import LessonListUser from "../pages/LessonListUser";
import LessonDetails from "../pages/LessonDetails"; // 👈 ADD THIS LINE
import Lesson1 from "../pages/Lesson1";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is a layout component that should include <Outlet />
    children: [
      {
        index: true,
        element: <HomeSkillShare />,
      },
      {
        path: "add",
        element: <AddLesson />,
      },
      {
        path: "update",
        element: <UpdateLesson />,
      },
      {
        path: "adminlist",
        element: <AdminLessonView />,
      },
      {
        path: "userlist",
        element: <LessonListUser />,
      },
      {
        path: "lesson/:id", // 👈 THIS ENABLES NAVIGATION TO DETAILS
        element: <LessonDetails />,
      },
      
      {
        path: "lesson1", // 👈 NEW STATIC ROUTE
        element: <Lesson1 />,
      },
    ],
  },
]);

export default router;
