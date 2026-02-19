import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#293379] dark:bg-gray-900 backdrop-blur-md text-white/90 p-8 mt-auto shadow-inner transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section — Brand + Motto */}
        <div>
          <h2 className="text-xl font-bold mb-2">Cureon</h2>
          <p className="text-white/70 dark:text-gray-300 text-sm">
            Empowering your medical health journey with care, technology, and
            compassion, one step at-a-time.
          </p>
          <p className="text-white/60 dark:text-gray-400 text-xs mt-3">
            Designed with{" "}
            <i className="fa-solid fa-heart text-[#fa003f] dark:text-red-400"></i>{" "}
            for your health
          </p>
        </div>

        {/* Right Section — Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-white/80 dark:text-gray-300">
            <i className="fa-solid fa-mobile"></i> +91 00000 00000
          </p>
          <p className="text-sm text-white/80 dark:text-gray-300">
            <i className="fa-solid fa-envelope"></i> support@cureon.com
          </p>
          <p className="text-sm text-white/80 dark:text-gray-300">
            <i className="fa-solid fa-location-dot"></i> 123 Health Street,
            Kolkata, India
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-3 mt-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-black transition-all duration-300"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Policy Links Row */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 dark:text-gray-300 mt-10">
        <a
          href="#"
          className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
        >
          Cookie Policy
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 dark:border-gray-600 mt-1 pt-3 text-center text-white/70 dark:text-gray-400 text-xs">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Cureon</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
