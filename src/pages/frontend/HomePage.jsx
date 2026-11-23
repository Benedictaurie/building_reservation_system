// src/pages/frontend/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import idLocale from '@fullcalendar/core/locales/id';
import api from '../../services/api'; // Import API service
import { formatRupiah } from '../../utils/formatRupiah';

const HomePage = () => {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk kalender (bisa disesuaikan ambil dari API kalender nanti)
  const [events] = useState([
    { id: 1, title: 'Reservasi', start: '2026-06-20', end: '2026-06-21', backgroundColor: '#BF0603' },
    { id: 2, title: 'Reservasi', start: '2026-06-25', end: '2026-06-26', backgroundColor: '#BF0603' },
  ]);

  // Fetch data dari backend
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await api.get('/buildings');
        setBuildings(response.data.data); // Sesuaikan dengan struktur ApiResponseResources
      } catch (error) {
        console.error("Gagal mengambil data gedung:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const scrollToBuildings = () => {
    const element = document.getElementById('gedung');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fungsi helper untuk mengambil harga termurah dari array rates
  const getStartingPrice = (rates) => {
    if (!rates || rates.length === 0) return 0;
    // Mengambil nilai price terkecil
    return Math.min(...rates.map(rate => parseFloat(rate.price)));
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section (Sama seperti sebelumnya) */}
      <section 
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('appimages/singa-ambara-raja-singaraja.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#001427]/90 via-[#001427]/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Sistem Informasi Reservasi Gedung
            </h1>
            <p className="text-xl mb-6 text-[#F4D58D]">
              Dinas Kebudayaan dan Pariwisata Kabupaten Buleleng
            </p>
            <p className="text-lg mb-8 text-gray-200">
              Sewa gedung untuk berbagai acara dengan mudah, cepat, dan transparan. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToBuildings} className="bg-[#BF0603] hover:bg-[#8D0801] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg">
                Lihat Gedung
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Biarkan statis atau sesuaikan nanti) */}
      {/* ... */}

      {/* Buildings Section - SUDAH DINAMIS */}
      <section id="gedung" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001427] mb-4">Daftar Gedung</h2>
          </div>  

          {isLoading ? (
            <div className="text-center text-xl text-gray-500">Memuat data gedung...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buildings.map((building) => {
                // Ambil gambar pertama dari relasi image_packages
                const mainImage = building.images && building.images.length > 0 
                  ? `http://localhost:8000/storage/${building.images[0].image}` 
                  : 'appimages/singa-ambara-raja-singaraja.jpg'; // Fallback jika tidak ada gambar

                const startPrice = getStartingPrice(building.rates);

                return (
                  <div key={building.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="h-56 overflow-hidden">
                      <img src={mainImage} alt={building.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-[#001427]">{building.name}</h3>
                        <span className="bg-[#F4D58D]/40 text-[#001427] text-xs font-semibold px-2 py-1 rounded">
                          Kapasitas {building.capacity}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{building.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-xs text-gray-500 block">Mulai dari</span>
                          <span className="text-xl font-bold text-[#BF0603]">
                            {formatRupiah(startPrice)}
                          </span>
                        </div>
                        {/* Menggunakan slug untuk URL detail jika ada, atau ID */}
                        <Link to={`/gedung/${building.slug}`} className="bg-[#BF0603] hover:bg-[#8D0801] text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sisa section kalender, tentang, dan kontak biarkan sama */}
    </div>
  );
};

export default HomePage;