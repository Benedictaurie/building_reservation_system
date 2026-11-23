//scr/pages/frontend/BuildingDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import idLocale from '@fullcalendar/core/locales/id';
import { formatRupiah } from '../../utils/formatRupiah';

const BuildingDetailPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const buildingsData = {
    1: {
      id: 1,
      name: 'Sasana Budaya',
      description: 'Gedung Sasana Budaya merupakan pusat kegiatan kebudayaan di Kabupaten Buleleng. Gedung ini sering digunakan untuk berbagai acara seni, budaya, seminar, dan pertemuan formal.',
      fullDescription: 'Sasana Budaya adalah gedung serbaguna yang terletak di pusat Kota Singaraja. Gedung ini memiliki arsitektur modern dengan sentuhan budaya Bali. Dilengkapi dengan fasilitas lengkap untuk mendukung berbagai jenis acara, mulai dari pertunjukan seni, konser, seminar, workshop, hingga pameran. Ruangan utama memiliki kapasitas hingga 500 orang dengan sistem tata suara dan pencahayaan profesional. Tersedia juga ruang persiapan (dressing room) untuk para artis atau pembicara.',
      capacity: 500,
      price_per_day: 1000000,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      images: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1507676184212-d8ab4c0f3bf5?w=800',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'
      ],
      features: [
        { name: 'AC Sentral', description: 'Sistem pendingin ruangan yang merata ke seluruh area' },
        { name: 'Sound System Profesional', description: 'Sistem audio dengan kualitas tinggi untuk acara' },
        { name: 'LCD Projector & Layar', description: 'Proyektor dengan layar 120 inci' },
        { name: 'Panggung Utama', description: 'Panggung dengan ukuran 8x4 meter' },
        { name: 'Dressing Room', description: '2 ruang persiapan untuk artis' },
        { name: 'Parkir Luas', description: 'Kapasitas parkir hingga 100 kendaraan' },
        { name: 'WiFi', description: 'Koneksi internet kecepatan tinggi' },
        { name: 'Ruang Rapat', description: '2 ruang rapat kecil untuk koordinasi' }
      ],
      rules: [
        'Dilarang membawa makanan dan minuman ke dalam ruangan utama',
        'Dilarang merokok di dalam gedung',
        'Pengunjung harus menjaga kebersihan dan ketertiban',
        'Kerusakan fasilitas akan dikenakan denda sesuai ketentuan',
        'Acara harus selesai paling lambat pukul 22.00 WITA'
      ]
    },
    2: {
      id: 2,
      name: 'Wantilan Pelabuhan Tua',
      description: 'Wantilan dengan nuansa tradisional Bali, cocok untuk upacara adat, pertemuan masyarakat, dan acara kebudayaan.',
      fullDescription: 'Wantilan Pelabuhan Tua adalah bangunan terbuka dengan arsitektur tradisional Bali yang terletak di kawasan Pelabuhan Tua Buleleng. Tempat ini sangat cocok untuk berbagai acara adat, pertemuan masyarakat, lomba-lomba tradisional, dan kegiatan kebudayaan lainnya. Suasana yang asri dengan pemandangan laut menambah keindahan acara yang diselenggarakan.',
      capacity: 300,
      price_per_day: 400000,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1507676184212-d8ab4c0f3bf5?w=800'
      ],
      features: [
        { name: 'Area Terbuka', description: 'Ruangan terbuka dengan atap wantilan' },
        { name: 'Panggung Tradisional', description: 'Panggung dengan arsitektur Bali' },
        { name: 'Sound System Portable', description: 'Sound system untuk acara' },
        { name: 'Parkir Area', description: 'Area parkir yang luas' },
        { name: 'Pemandangan Laut', description: 'View langsung ke Pelabuhan Tua' }
      ],
      rules: [
        'Menjaga kebersihan area wantilan',
        'Dilarang membuang sampah sembarangan',
        'Menghormati adat dan budaya setempat',
        'Acara yang menggunakan sesajen harus dikoordinasikan terlebih dahulu'
      ]
    },
    3: {
      id: 3,
      name: 'Gedung Mr. I Gusti Ketut Pudja',
      description: 'Gedung khusus untuk pertunjukan seni, teater, dan pagelaran budaya.',
      fullDescription: 'Gedung Mr. Pudja adalah gedung bersejarah yang menyimpan nilai-nilai perjuangan bangsa. Arsitektur klasik bergaya Indis membuatnya sangat cocok untuk acara-acara formal seperti pertemuan resmi, konferensi, pernikahan adat, dan acara kenegaraan lainnya.',
      capacity: 400,
      price_per_day: 2500000,
      image: 'https://images.unsplash.com/photo-1507676184212-d8ab4c0f3bf5?w=800',
      images: [
        'https://images.unsplash.com/photo-1507676184212-d8ab4c0f3bf5?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'
      ],
      features: [
        { name: 'AC Central', description: 'Pendingin ruangan central' },
        { name: 'Sound System Profesional', description: 'Sistem audio berkualitas tinggi' },
        { name: 'Lighting System', description: 'Sistem pencahayaan profesional' },
        { name: 'Green Room', description: 'Ruang persiapan untuk performer' },
        { name: 'Tribun Penonton', description: 'Tempat duduk bertingkat' }
      ],
      rules: [
        'Dilarang membawa makanan dan minuman ke area pertunjukan',
        'Handphone harus dalam mode silent saat pertunjukan',
        'Dilarang merekam tanpa izin',
        'Pengunjung harus sudah berada di dalam gedung 15 menit sebelum acara dimulai'
      ]
    },
    4: {
      id: 4,
      name: 'Gedung Kesenian Gde Manik',
      description: 'Gedung bersejarah dengan arsitektur klasik untuk acara formal dan pertemuan resmi.',
      fullDescription: 'Gedung Kesenian adalah venue khusus yang dirancang untuk pertunjukan seni seperti teater, tari, musik, dan pagelaran budaya lainnya. Dilengkapi dengan sistem akustik yang baik dan lighting profesional untuk mendukung kualitas pertunjukan.',
      capacity: 300,
      price_per_day: 10000000,
      image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800',
      images: [
        'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1507676184212-d8ab4c0f3bf5?w=800'
      ],
      features: [
        { name: 'Ruangan Eksklusif', description: 'Ruangan dengan nuansa klasik' },
        { name: 'AC', description: 'AC terpusat' },
        { name: 'WiFi Cepat', description: 'Koneksi internet kecepatan tinggi' },
        { name: 'Ruang Rapat', description: '3 ruang rapat terpisah' },
        { name: 'Catering Area', description: 'Area khusus untuk catering' },
        { name: 'Taman', description: 'Taman asri di sekitar gedung' }
      ],
      rules: [
        'Berpakaian rapi dan sopan',
        'Dilarang merokok di dalam gedung',
        'Menjaga kebersihan dan keasrian gedung bersejarah',
        'Acara formal harus mendapatkan izin khusus'
      ]
    }
  };

  const [events, setEvents] = useState([
    { id: 1, title: 'Reservasi', start: '2026-06-20', end: '2026-06-21', backgroundColor: '#ef4444' },
    { id: 2, title: 'Reservasi', start: '2026-06-25', end: '2026-06-26', backgroundColor: '#ef4444' },
    { id: 3, title: 'Reservasi', start: '2026-06-01', end: '2026-06-02', backgroundColor: '#ef4444' },
    { id: 4, title: 'Reservasi', start: '2026-06-27', end: '2026-06-28', backgroundColor: '#ef4444' },
  ]);

  useEffect(() => {
    setBuilding(buildingsData[id]);
  }, [id]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  if (!building) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat data gedung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-96">
        <img 
          src={building.image} 
          alt={building.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{building.name}</h1>
            <div className="flex items-center space-x-4 text-white">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Kapasitas {building.capacity} orang
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatRupiah(building.price_per_day)} / hari
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Deskripsi Gedung</h2>
              <p className="text-gray-600 leading-relaxed">{building.fullDescription}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fasilitas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {building.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.name}</h4>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Peraturan</h2>
              <ul className="space-y-2">
                {building.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kalender Ketersediaan</h3>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={idLocale}
                events={events}
                dateClick={handleDateClick}
                headerToolbar={false}
                height="auto"
                eventDisplay="block"
              />
              {selectedDate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Tanggal yang dipilih: <strong>{selectedDate}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">{formatRupiah(building.price_per_day)}</span>
                <span className="text-gray-500"> / hari</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tanggal Sewa</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Jumlah Hari</label>
                <input 
                  type="number" 
                  min="1"
                  defaultValue="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <Link
                to={`/reservasi/${building.id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition duration-300"
              >
                Reservasi Sekarang
              </Link>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>✓ Verifikasi OTP via Email</p>
                <p>✓ Konfirmasi Cepat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetailPage;