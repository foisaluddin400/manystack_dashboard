import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";
import CreatorManagement from "../page/CreatorManagement/CreatorManagement";

import Subscription from "../page/Subscription/Subscription";

import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";

import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";

import Login from "../Auth/Login";
import Category from "../page/category/Category";
import Admin from "../page/admin/Admin";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/CreatorManagement",
        element: <CreatorManagement></CreatorManagement>,
      },
      
   {
        path: "/dashboard/category",
        element:<Category></Category>
      },

      {
        path: "/dashboard/admin",
        element:<Admin></Admin>
      },
      {
        path: "/dashboard/Subscription",
        element: <Subscription></Subscription>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/contact",
        element: <FAQ></FAQ>,
      },
     
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
