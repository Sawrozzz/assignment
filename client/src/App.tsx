import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loader from "./components/Loader";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LoginPage = lazy(() => import("./pages/login"));
const HomePage = lazy(() => import("./pages/home"));
const PageNotFoundPage = lazy(() => import("./pages/pageNotFound"));

export default function App() {
  const isAuthenticated: boolean = false;
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <PageNotFoundPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
