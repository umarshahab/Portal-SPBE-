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
  // Status login tetap dipertahankan
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("spbe_authenticated") === "true"
  );

  // Data evidence bersama untuk seluruh portal
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
        {/* DASHBOARD PEMDI */}
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

        {/* LOGIN TETAP TERSEDIA */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* DASHBOARD EVALUASI */}
        <Route
          path="/evaluasi"
          element={
            <Evaluasi
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
              indicatorsData={indicatorsData}
              setIndicatorsData={setIndicatorsData}
              onLogout={handleLogout}
            />
          }
        />

        {/* DATA EVIDENCE */}
        <Route
          path="/evaluasi/data-evidence"
          element={
            <DataEvidence
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
            />
          }
        />

        {/*REDIRECT ROUTE LAMA*/}

        <Route
          path="/preview/evaluasi"
          element={<Navigate to="/evaluasi" replace />}
        />

        <Route
          path="/preview/data-evidence"
          element={
            <Navigate to="/evaluasi/data-evidence" replace />
          }
        />

        {/* Halaman tidak ditemukan */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
