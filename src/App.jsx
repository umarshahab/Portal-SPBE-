
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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

function App() {
  // Status login lokal
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("spbe_authenticated") === "true"
  );

  // Data evidence bersama
  const [evidenceData, setEvidenceData] = useState({});

  // Data indikator bersama
  const [indicatorsData, setIndicatorsData] = useState(initialIndicators);

  // Login berhasil
  function handleLogin() {
    localStorage.setItem("spbe_authenticated", "true");
    setIsAuthenticated(true);
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("spbe_authenticated");
    setIsAuthenticated(false);
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* HALAMAN PUBLIK */}
        <Route
          path="/"
          element={
            <PublicLayout>
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
            <PublicLayout>
              <Indeks />
            </PublicLayout>
          }
        />

        <Route
          path="/regulasi"
          element={
            <PublicLayout>
              <Regulasi />
            </PublicLayout>
          }
        />

        <Route
          path="/galeri"
          element={
            <PublicLayout>
              <Galeri />
            </PublicLayout>
          }
        />

        <Route
          path="/informasi"
          element={
            <PublicLayout>
              <Informasi />
            </PublicLayout>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* HALAMAN EVALUASI - WAJIB LOGIN */}
        <Route
          path="/preview/evaluasi"
          element={
            isAuthenticated ? (
              <Evaluasi
                evidenceData={evidenceData}
                setEvidenceData={setEvidenceData}
                indicatorsData={indicatorsData}
                setIndicatorsData={setIndicatorsData}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* DATA EVIDENCE - WAJIB LOGIN */}
        <Route
          path="/preview/data-evidence"
          element={
            isAuthenticated ? (
              <DataEvidence
                evidenceData={evidenceData}
                setEvidenceData={setEvidenceData}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ROUTE EVALUASI LAMA */}
        <Route
          path="/evaluasi/*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
