import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AllNotificationsPage } from '../pages/AllNotificationsPage';
import { PriorityInboxPage } from '../pages/PriorityInboxPage';
import { logFrontend } from '../utils/logger';
import { getAuthToken } from '../api/authService';

export const AppRouter: React.FC = () => {
  useEffect(() => {
     getAuthToken().then(() => {
        logFrontend('info', 'page', 'App Router Initialized');
     });
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AllNotificationsPage />} />
          <Route path="/priority" element={<PriorityInboxPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
