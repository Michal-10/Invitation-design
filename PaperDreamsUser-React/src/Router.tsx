import { createBrowserRouter } from "react-router";
import DesignInvitation from "./components/design/DesignInvitation";
import UpdateUser from "./pages/login/UpdateUser";
import AppLayout from "./components/AppLayout";
import ChooseTemplatesAnduplooadFile from "./components/Templates/ChooseTemplatesAnduplooadFile";
import MyCompletedInvitationPage from "./components/completedInvitation/MyCompletedInvitation";
import LoginPage from "./pages/login/LoginPage";
import ChooseCategoryTemplate from "./components/ChooseCategoryTemplate";
import HomePage from "./components/homePage/HomePage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: (<><AppLayout /></>),
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "updateUser",
        element: <UpdateUser />,
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
        element: <MyCompletedInvitationPage />,
      },
      {
        path: "profile",
        element: <UpdateUser />,
      }
    ],
  },
])

