import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from './assets/logo1.png';
import Footer from "./Footer";

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  // Control navbar visibility on scroll
  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    setShowNavbar(currentScrollY <= lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={`flex w-full h-24 lg:h-28 font-bold bg-[#0a1128] sticky top-0 opacity-80 z-10 transition-transform duration-300 ${showNavbar ? '' : 'transform -translate-y-full'}`}>
        <div className="w-5/6 ml-4 lg:ml-16 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} className="h-16 w-16" alt="Shaastra Logo" />
            <Link to="/"><h2 className="text-2xl lg:text-4xl text-slate-200 ml-2">Gut Microbiome Index</h2></Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex text-2xl w-3/5 space-x-16 justify-end items-center text-slate-200">
            <Link to="/">Home</Link>
            <Link to="/subject">Subject</Link>
            <Link to="/microbes">Microbes</Link>
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMobileMenu} className="lg:hidden text-2xl text-slate-200">
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 left-0 h-screen w-3/4 max-w-xs bg-[#0a1128] z-20 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
          <div className="flex flex-col p-8 space-y-6 text-2xl text-slate-200">
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/subject" onClick={toggleMobileMenu}>Subject</Link>
            <Link to="/microbes" onClick={toggleMobileMenu}>Microbes</Link>
          </div>
        </div>
      </nav>

      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
