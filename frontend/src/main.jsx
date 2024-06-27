import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utility/ProtectedRoute.jsx";
import PageLoader from "./Components/PageLoader/PageLoader.jsx";
import Header from "./Components/Header/Header";

const App = lazy(() => import("./App.jsx"));
const SignupPage = lazy(() =>
  import("./Pages/userRegistration/SignupPage.jsx")
);
const SendOtpPage = lazy(() =>
  import("./Pages/userRegistration/SendOtpPage.jsx")
);
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SendOtpPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <Header />
        <Dashboard />
      </Suspense>
      // </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
