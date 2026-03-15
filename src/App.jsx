import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { Suspense, lazy, useEffect } from "react";

const AppLayout = lazy(() => import("./ui/AppLayout/AppLayout.jsx"));
const HomePage = lazy(() => import("./pages/homepage/HomePage.jsx"));
const TasksPage = lazy(() => import("./pages/tasks/TasksPage.jsx"));
const Errorpage = lazy(() => import("./errors/Errorpage.jsx"));
const WorkItemPage = lazy(() => import("./pages/workitempage/WorkItemPage.jsx"));
const YourTasksPage = lazy(() => import("./pages/yourtaskspage/YourTasksPage.jsx"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage.jsx"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage.jsx"));
const ProfileSettingsPage = lazy(() => import("./pages/settings/profilesettings/ProfileSettingsPage.jsx"));
const EmailPasswordSettingsPage = lazy(() => import("./pages/settings/emailpasswordsettings/EmailPasswordSettingsPage.jsx"));
const NotificationSettingsPage = lazy(() => import("./pages/settings/notificationssettings/NotificationSettingsPage.jsx"));
const VisibilitySettingsPage = lazy(() => import("./pages/settings/visibilitysettings/VisibilitySettingsPage.jsx"));
const SignUpFormPage = lazy(() => import("./pages/signupform/SignUpFormPage.jsx"));
const LogInFormPage = lazy(() => import("./pages/loginformpage/LogInFormPage.jsx"));
const MessagePage = lazy(() => import("./pages/messagepage/MessagePage.jsx"));
const AllMessagesPage = lazy(() => import("./pages/messagepage/AllMessagesPage.jsx"));
const CreateWorkMateFormPage = lazy(() => import("./pages/workmatespage/CreateWorkMateFormPage.jsx"));
const CreateTaskFormPage = lazy(() => import("./pages/tasks/CreateTaskFormPage.jsx"));
const WorkMatesPage = lazy(() => import("./pages/workmatespage/WorkMatesPage.jsx"));
const WorkMatePage = lazy(() => import("./pages/workmatepage/WorkMatePage.jsx"));

import { savedTasksLoader } from "./pages/tasks/SavedTasksLoader.js";
import { getCurrentLocation } from "./services/apis/GeoLocationApi.js";
import { HomePageLoader } from "./pages/homepage/HomePageLoader.js";

export default function App() {
  console.log("APP RENDERED");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const { lat, lng } = await getCurrentLocation();
        localStorage.setItem("userLocation", JSON.stringify([lng, lat]));
      } catch (err) {
        console.error("❌ Failed to get location:", err);
      }
    }

    fetchLocation();
  }, []);

  const desktopRoutes = [
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AppLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <Errorpage />
        </Suspense>
      ),
      children: [
        { path: "/", element: <Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense> },
        { path: "/tasks", element: <Suspense fallback={<div>Loading...</div>}><TasksPage /></Suspense>, loader: savedTasksLoader },
        { path: "/tasks/:id", element: <Suspense fallback={<div>Loading...</div>}><WorkItemPage /></Suspense>, loader: savedTasksLoader },
        { path: "/yourtasks", element: <Suspense fallback={<div>Loading...</div>}><YourTasksPage /></Suspense>, loader: savedTasksLoader },
        { path: "/createtask", element: <Suspense fallback={<div>Loading...</div>}><CreateTaskFormPage /></Suspense> },

        { path: "/workmates", element: <Suspense fallback={<div>Loading...</div>}><WorkMatesPage /></Suspense> },
        { path: "/workmates/:id", element: <Suspense fallback={<div>Loading...</div>}><WorkMatePage /></Suspense> },
        { path: "/createworkmate", element: <Suspense fallback={<div>Loading...</div>}><CreateWorkMateFormPage /></Suspense> },

        {
          path: "/messages",
          element: <Suspense fallback={<div>Loading...</div>}><AllMessagesPage /></Suspense>,
          children: [
            { path: ":id", element: <Suspense fallback={<div>Loading...</div>}><MessagePage /></Suspense> },
          ],
        },

        {
          path: "/settings",
          element: <Suspense fallback={<div>Loading...</div>}><SettingsPage /></Suspense>,
          children: [
            { index: true, element: <Suspense fallback={<div>Loading...</div>}><ProfileSettingsPage /></Suspense> },
            { path: "profile", element: <Suspense fallback={<div>Loading...</div>}><ProfileSettingsPage /></Suspense> },
            { path: "email-password", element: <Suspense fallback={<div>Loading...</div>}><EmailPasswordSettingsPage /></Suspense> },
            { path: "notifications", element: <Suspense fallback={<div>Loading...</div>}><NotificationSettingsPage /></Suspense> },
            { path: "visibility", element: <Suspense fallback={<div>Loading...</div>}><VisibilitySettingsPage /></Suspense> },
          ],
        },

        { path: "/profile/:id", element: <Suspense fallback={<div>Loading...</div>}><ProfilePage /></Suspense> },
      ],
      loader: HomePageLoader,
    },
    { path: "/signup", element: <Suspense fallback={<div>Loading...</div>}><SignUpFormPage /></Suspense> },
    { path: "/login", element: <Suspense fallback={<div>Loading...</div>}><LogInFormPage /></Suspense> },
  ];

  const router = createBrowserRouter(desktopRoutes);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}
