import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AirmanListView from './views/airmen/AirmenProgressView';
import AirmanView from './views/airmen/AirmanView';
import ManageTasksView from './views/tasks/ManageTasksView';
import DashboardView from './views/analytics/DashboardView';
import VerificationView from './views/verifications/VerificationView';
import NotFoundView from './views/errors/NotFoundView';
import AppLayout from './layouts/appLayout';

const routes = [
  {
    path: 'app',
    element: <AppLayout />,
    children: [
      { path: 'airmen', element: <AirmanListView /> },
      { path: 'airmen/:id', element: <AirmanView /> },
      { path: 'tasks', element: <ManageTasksView /> },
      { path: 'verifications', element: <VerificationView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/tasks" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
