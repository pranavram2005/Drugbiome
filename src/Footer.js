import React from "react";
import logo from './assets/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a1128] text-white py-10">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center md:items-start space-y-10 md:space-y-0">
        
        {/* Logo and Title */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start mb-8 md:mb-0">
          <img src={logo} alt="Logo" className="h-36 w-auto mb-3 md:h-36" /> 
          <h2 className="text-2xl md:text-4xl font-bold md:-ml-20">Gut Microbiome Index</h2>
        </div>
        
        {/* Address Section */}
        <div className="text-center md:text-left w-full md:w-2/4 mb-8 md:mb-0">
          <h3 className="text-orange-400 text-3xl md:text-3xl font-bold mb-3">Address</h3>
          <ul className="space-y-4 text-xl md:text-xl">
            <li>
              <i className='bx bx-location-plus mr-2'></i> 
              Biotech Club, Center For Innovation, X6VH+6XQ, Indian Institute Of Technology, Chennai, Tamil Nadu 600036
            </li>
            <li>
              <i className='bx bxl-gmail mr-2'></i> 
              biotech_cfi@smail.iitm.ac.in
            </li>

          </ul>
        </div>
        
        {/* Map Section */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <div className="w-full h-64 md:h-64 md:w-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6676194415363!2d80.22741267507679!3d12.993098287324253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52679e63dd1873%3A0xc4747c0e88c8a64b!2sCentre%20for%20Innovation!5e0!3m2!1sen!2sin!4v1725713361382!5m2!1sen!2sin" 
              className="w-full h-full rounded-lg border-0 shadow-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
