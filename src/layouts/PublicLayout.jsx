
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout({
  children,
  isAuthenticated,
  onLogout,
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
