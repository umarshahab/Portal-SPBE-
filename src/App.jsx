
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  // Penyimpanan evidence bersama antarhalaman
  const [evidenceData, setEvidenceData] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
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

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard evaluasi */}
        <Route
          path="/preview/evaluasi"
          element={
            <Evaluasi
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
            />
          }
        />

        {/* Halaman Data Evidence */}
        <Route
          path="/preview/data-evidence"
          element={
            <DataEvidence
              evidenceData={evidenceData}
              setEvidenceData={setEvidenceData}
            />
          }
        />

        {/* Evaluasi sebenarnya tetap diarahkan ke login */}
        <Route
          path="/evaluasi/*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
