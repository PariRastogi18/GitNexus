import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/auth/SignupPage.jsx";
import SignIn from "./components/auth/SigninPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NotFound from "./components/utils/NotFoundPage.jsx";
import { useAuth } from "./components/context/AuthContext.jsx";
import Loading from "./components/utils/Loading.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

function App() {
  const { isAuthenticate } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
