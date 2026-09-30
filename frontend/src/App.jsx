import { Route, Routes } from "react-router-dom";
import Signup from "./components/auth/SignupPage.jsx";
import SignIn from "./components/auth/SigninPage.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NotFound from "./components/utils/NotFoundPage.jsx";
import { useAuth } from "./components/context/AuthContext.jsx";
import Loading from "./components/utils/Loading.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import AllRepoPage from "./components/Pages/AllRepoPage.jsx";
import CreateRepository from "./components/repo/NewRepoPage.jsx";
import {EditRepository} from "./components/repo/EditRepository.jsx";
import Profile from "./components/user/UserProfilePage.jsx";
import EditProfile from "./components/user/EditProfile.jsx";

function App() {
  const { isAuthenticate } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={isAuthenticate ? <Loading /> : <Signup />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allRepos"
          element={
            <ProtectedRoute>
              <AllRepoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <CreateRepository />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editRepo"
          element={
            <ProtectedRoute>
              < EditRepository/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={isAuthenticate ? <Loading /> : <SignIn />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
