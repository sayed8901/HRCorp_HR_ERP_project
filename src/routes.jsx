import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utilities/ScrollToTop.jsx";
import LazyLoad from "react-lazy-load";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PowerUserRegister from "./authentication/PowerUserRegister.jsx";
import StandardUserRegister from "./authentication/StandardUserRegister.jsx";
import Login from "./authentication/Login.jsx";
import PowerUserProfile from "./pages/profiles/PowerUserProfile.jsx";
import StandardUserProfile from "./pages/profiles/StandardUserProfile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop></ScrollToTop>
        <App></App>
      </>
    ),
    errorElement: (
      <LazyLoad>
        <ErrorPage></ErrorPage>
      </LazyLoad>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/power_user_register",
        element: (
          <LazyLoad>
            <PowerUserRegister></PowerUserRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/standard_user_register",
        element: (
          <LazyLoad>
            <StandardUserRegister></StandardUserRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/login",
        element: (
          <LazyLoad>
            <Login></Login>
          </LazyLoad>
        ),
      },
      {
        path: "/power_user_profile",
        element: (
          <LazyLoad>
            <PowerUserProfile></PowerUserProfile>
          </LazyLoad>
        ),
      },
      {
        path: "/standard_user_profile",
        element: (
          <LazyLoad>
            <StandardUserProfile></StandardUserProfile>
          </LazyLoad>
        ),
      },
    ],
  },
]);
