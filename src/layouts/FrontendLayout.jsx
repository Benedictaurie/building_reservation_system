// src/layouts/FrontendLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';

const FrontendLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Gedung', path: '/#gedung' },
    { name: 'Tentang', path: '/#tentang' },
    { name: 'Kontak', path: '/#kontak' },
  ];

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#001427]">
      {/* Navbar */}
      <nav className="bg-[#001427] text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#BF0603] rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">SIREN</span>
                <span className="text-xs text-[#F4D58D] block -mt-1 font-medium">Reservasi Gedung</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.path === '/' ? '/' : item.path)}
                  className="text-gray-300 hover:text-[#F4D58D] transition duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              
              <Dropdown
                trigger={
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-[#F4D58D] transition duration-300">
                    <span>Akun</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                }
              >
                <Dropdown.Content>
                  <Dropdown.Link href="/admin">Admin Panel</Dropdown.Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Dropdown.Link href="#">Login</Dropdown.Link>
                  <Dropdown.Link href="#">Daftar</Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.path === '/' ? '/' : item.path)}
                  className="block w-full text-left py-2 text-gray-300 hover:text-[#F4D58D] transition duration-300"
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t border-gray-700 my-2"></div>
              <button className="block w-full text-left py-2 text-gray-300 hover:text-[#F4D58D] transition duration-300">
                Login
              </button>
              <button className="block w-full text-left py-2 text-gray-300 hover:text-[#F4D58D] transition duration-300">
                Daftar
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#001427] text-white mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#BF0603] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <span className="font-bold text-xl">SIREN</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Sistem Informasi Reservasi Gedung Dinas Kebudayaan dan Pariwisata Kabupaten Buleleng.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#F4D58D] mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Beranda</a></li>
                <li><a href="/#gedung" className="hover:text-white transition">Daftar Gedung</a></li>
                <li><a href="/#tentang" className="hover:text-white transition">Tentang</a></li>
                <li><a href="/#kontak" className="hover:text-white transition">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#F4D58D] mb-4">Gedung</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Sasana Budaya</a></li>
                <li><a href="#" className="hover:text-white transition">Wantilan Pelabuhan Tua</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#F4D58D] mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#708D81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Jl. Kartini No. 6, Buleleng, Bali</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#708D81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>disbudpar@buleleng.go.id</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#708D81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(0362) 123456</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 SIREN - Sistem Informasi Reservasi Gedung Dinas Kebudayaan dan Pariwisata Kabupaten Buleleng. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontendLayout;