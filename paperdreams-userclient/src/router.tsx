import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./components/HomePage";
import { SingInAndUp } from "./pages/login/SingInAndUp";
import ShowTemplates from "./components/ShowTemplates";
import ChooseCategoryTemplate from "./components/ChooseCategoryTemplate";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />, // ברירת מחדל: ניתוב לעמוד ההתחברות
      },
      {
        path: "/login",
        element: <SingInAndUp />,
      },
      {
        path: "/homePage",
        element: <HomePage />,
        children: [
        //   { path: "", element: <HomePage /> }
        //   ,{ path: "about", element: <AboutPage /> }
        ]
      },
      {
        path:'/showTemplates',
        element:<ChooseCategoryTemplate/>
      }
    /*
    path: '/',
  element: <AppLayout />,
  children: [
    { path: '/Home', element: <HomePage />, errorElement: <h1>Error</h1> },
    { path: '/About', element: <About />, errorElement: <h1>Error</h1> },
    {
      path: '/RecipesList',
      element:
        <RecipesList />
      , children: [{
        path: ':id', element: <ShowRecipe />, errorElement: <h1>Error</h1>
      }]
      , errorElement: <h1>Error</h1>
    },
    {
      path: '/AddRecipe',
      element:
        <AddRecipe />
      , errorElement: <h1>Error</h1>,
      children: [{
        path: 'Home', element: <AppLayout />, errorElement: <h1>Error</h1>
      }]
    }
  ] */
    
])
