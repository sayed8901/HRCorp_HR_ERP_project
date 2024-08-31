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
import EntryNewEmployee from "./pages/HR_staff_management/EntryNewEmployee.jsx";
import AllEmployeeList from "./pages/HR_staff_management/AllEmployeeList.jsx";
import EmployeeDetails from "./pages/HR_staff_management/EmployeeDetails/EmployeeDetails.jsx";
import Transfer from "./pages/HR_operation/Transfer/Transfer.jsx";

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

      // power_user routes
      {
        path: "/power_user_register",
        element: (
          <LazyLoad>
            <PowerUserRegister></PowerUserRegister>
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

      // standard_user routes
      {
        path: "/standard_user_register",
        element: (
          <LazyLoad>
            <StandardUserRegister></StandardUserRegister>
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

      // common routes both for power_user & standard_user
      {
        path: "/login",
        element: (
          <LazyLoad>
            <Login></Login>
          </LazyLoad>
        ),
      },
      {
        path: "/entry_new_employee",
        element: (
          <LazyLoad>
            <EntryNewEmployee></EntryNewEmployee>
          </LazyLoad>
        ),
      },
      {
        path: "/all_employee",
        element: (
          <LazyLoad>
            <AllEmployeeList></AllEmployeeList>
          </LazyLoad>
        ),
      },
      {
        path: "/transfer",
        element: (
          <LazyLoad>
            <Transfer></Transfer>
          </LazyLoad>
        ),
      },
      
      // accessible routes for power_user, standard_user, general employee or no logged_in_user
      {
        path: "/employee_details/:employee_id",
        element: (
          <LazyLoad>
            <EmployeeDetails></EmployeeDetails>
          </LazyLoad>
        ),
      },
      {
        path: "/view_employee_details",
        element: (
          <LazyLoad>
            <EmployeeDetails></EmployeeDetails>
          </LazyLoad>
        ),
      },
    ],
  },
]);
