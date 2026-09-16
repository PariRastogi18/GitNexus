import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/auth/SignupPage.jsx";
import SignIn from "./components/auth/SigninPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NotFound from "./components/NotFoundPage.jsx";
import { useAuth } from "./components/context/AuthContext.jsx";

function App() {
  const { isAuthenticate } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={isAuthenticate ? <Dashboard /> : <Signup />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={isAuthenticate ? <Dashboard /> : <Signup />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
