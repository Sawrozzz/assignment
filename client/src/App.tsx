import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loader from "./components/Loader";
import ProtectedNavs from "./components/ProtectedRoutes";
import { useAuthStore } from "./store/authStore";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const FavouritePage = lazy(() => import("./pages/favourite"));
const PageNotFoundPage = lazy(() => import("./pages/pageNotFound"));

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
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
          <Route path="/register" element={<RegisterPage />}></Route>
          {isAuthenticated && (
            <Route element={<ProtectedNavs />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/favourite" element={<FavouritePage />} />
            </Route>
          )}
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
