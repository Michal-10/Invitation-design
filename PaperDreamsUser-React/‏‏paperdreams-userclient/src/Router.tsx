import { createBrowserRouter } from "react-router";
import ChooseCategoryTemplate from "./components/ChooseCategoryTemplate";
import MyCompletedInvitation from "./components/completedInvitation/MyCompletedInvitation";
import DesignInvitation from "./components/design/DesignInvitation";
import UpdateUser from "./pages/login/UpdateUser";
import HomePage from "./components/HomePage";
import AppLayout from "./components/AppLayout";
import ChooseTemplatesAnduplooadFile from "./components/Templates/ChooseTemplatesAnduplooadFile";
import SingInAndUp from "./pages/login/SingInAndUp";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, 
        // path: "homePage",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <SingInAndUp />,
      },
      {
        path: "chooseCategory",
        element: <ChooseCategoryTemplate />,
      },
      {
        path: "showTemplates",
        element: <ChooseTemplatesAnduplooadFile />,
      },
      {
        path: "designInvitation",
        element: <DesignInvitation />,
      },
      {
        path: "MyCompletedInvitation",
        element: <MyCompletedInvitation />,
      },
      {
        path: "profile",
        element: <UpdateUser />,
      },
    ],
  },
])

