import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SpacePage from "./pages/SpacePage";
import ProtectedRoute from "./components/ProtectedRoute"; // This will be created next
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/space"
        element={
          <ProtectedRoute>
            <SpacePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/space" />} />
    </Routes>
  );
}

export default App;
