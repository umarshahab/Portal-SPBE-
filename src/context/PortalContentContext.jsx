
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  gallery as initialGallery,
  documents as initialDocuments,
} from "../data/portalData";

const STORAGE_KEY = "pemdi_portal_content";

const defaultContent = {
  regulations: [],
  gallery: initialGallery,
  news: [],
  documents: initialDocuments,
  heroImages: [
    {
      id: 1,
      src: "/dmi1.jpg",
      alt: "Dokumentasi Pemerintah Kota Dumai",
    },
    {
      id: 2,
      src: "/dmi2.jpg",
      alt: "Kegiatan Pemerintah Kota Dumai",
    },
    {
      id: 3,
      src: "/dmi3.jpg",
      alt: "Lingkungan Pemerintah Kota Dumai",
    },
  ],
};

const PortalContentContext = createContext(null);

function loadContent() {
  try {
    const savedContent = localStorage.getItem(STORAGE_KEY);

    if (!savedContent) return defaultContent;

    const parsedContent = JSON.parse(savedContent);

    return {
      ...defaultContent,
      ...parsedContent,
    };
  } catch (error) {
    console.error("Gagal membaca data Portal PEMDI:", error);
    return defaultContent;
  }
}

export function PortalContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      console.error("Gagal menyimpan data Portal PEMDI:", error);
      alert(
        "Penyimpanan gagal. Kemungkinan kapasitas browser sudah penuh."
      );
    }
  }, [content]);

  function updateContent(section, data) {
    setContent((current) => ({
      ...current,
      [section]: data,
    }));
  }

  const value = {
    content,
    updateContent,
  };

  return (
    <PortalContentContext.Provider value={value}>
      {children}
    </PortalContentContext.Provider>
  );
}

export function usePortalContent() {
  const context = useContext(PortalContentContext);

  if (!context) {
    throw new Error(
      "usePortalContent harus digunakan di dalam PortalContentProvider"
    );
  }

  return context;
}
