import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Placeholder Imports (Files to be created)
import Home from "./pages/Home";
import Weddings from "./pages/Weddings";
import Accommodation from "./pages/Accommodation";
import Pool from "./pages/Pool";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RoomsManager from "./pages/admin/RoomsManager";
import GalleryManager from "./pages/admin/GalleryManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import InquiriesManager from "./pages/admin/InquiriesManager";
import NotFound from "./pages/NotFound";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/common/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weddings-events" element={<Weddings />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/swimming-pool-leisure" element={<Pool />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomsManager />} />
        <Route path="/admin/gallery" element={<GalleryManager />} />
        <Route path="/admin/testimonials" element={<TestimonialsManager />} />
        <Route path="/admin/inquiries" element={<InquiriesManager />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
