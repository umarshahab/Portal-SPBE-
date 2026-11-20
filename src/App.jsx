
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { indicators as initialIndicators } from "./data/evaluationData";

import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/Home";
import Indeks from "./pages/Indeks";
import Regulasi from "./pages/Regulasi";
import Galeri from "./pages/Galeri";
import Informasi from "./pages/Informasi";
import Login from "./pages/Login";
import Evaluasi from "./pages/Evaluasi";
import DataEvidence from "./pages/DataEvidence";
import CMS from "./pages/CMS";
import { PortalContentProvider } from "./context/PortalContentContext";
import CMSRegulasi from "./pages/cms/CMSRegulasi";
import CMSGaleri from "./pages/cms/CMSGaleri";
import CMSInformasi from "./pages/cms/CMSInformasi";
import CMSHero from "./pages/cms/CMSHero";

// Proteksi halaman yang membutuhkan login
function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [evidenceData, setEvidenceData] = useState({});
  const [indicatorsData, setIndicatorsData] = useState(initialIndicators);

  function handleLogin() {
    localStorage.setItem("pemdi_authenticated", "true");
    localStorage.removeItem("spbe_authenticated");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("pemdi_authenticated");
    localStorage.removeItem("spbe_authenticated");
    setIsAuthenticated(false);
    window.location.href = "/";
  }

  return (
    <Routes>
      {/* PORTAL PEMDI - PUBLIK */}
      <Route
        path="/"
        element={
          <PublicLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          >
            <Home
              evidenceData={evidenceData}
              indicatorsData={indicatorsData}
            />
          </PublicLayout>
        }
      />

      <Route
        path="/indeks"
        element={
          <PublicLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          >
            <Indeks />
          </PublicLayout>
        }
      />

      <Route
        path="/regulasi"
        element={
          <PublicLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          >
            <Regulasi />
          </PublicLayout>
        }
      />

      <Route
        path="/galeri"
        element={
          <PublicLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          >
            <Galeri />
          </PublicLayout>
        }
      />

      <Route
        path="/informasi"
        element={
          <PublicLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          >
            <Informasi />
          </PublicLayout>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* PORTAL EVIDENCE - PRIVATE */}
      <Route
        path="/evaluasi"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Evaluasi
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
              indicatorsData={indicatorsData}
              setIndicatorsData={setIndicatorsData}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/evaluasi/data-evidence"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DataEvidence
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
            />
          </ProtectedRoute>
        }
      />
      
      {/* CMS - ADMIN PANEL */}
      <Route
        path="/cms"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CMS onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cms/regulasi"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CMSRegulasi onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cms/galeri"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CMSGaleri onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cms/informasi"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CMSInformasi onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cms/hero"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CMSHero onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* REDIRECT ROUTE LAMA */}
      <Route
        path="/preview/evaluasi"
        element={<Navigate to="/evaluasi" replace />}
      />

      <Route
        path="/preview/data-evidence"
        element={<Navigate to="/evaluasi/data-evidence" replace />}
      />

      {/* HALAMAN TIDAK DITEMUKAN */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortalContentProvider>
        <AppContent />
      </PortalContentProvider>
    </BrowserRouter>
  );
} 
