import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ReservationSuccessPage = () => {
  const location = useLocation();
  const { buildingName, eventDate, eventName } = location.state || {};

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-block bg-white rounded-full p-3 mb-4">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Reservasi Berhasil!</h1>
            <p className="text-green-100">Permohonan reservasi Anda telah kami terima</p>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-gray-800 mb-3">Detail Reservasi</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Gedung</span>
                  <span className="font-medium">{buildingName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Acara</span>
                  <span className="font-medium">{eventName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal</span>
                  <span className="font-medium">{eventDate || '-'}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-gray-800 mb-2">📋 Informasi Penting</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Admin akan segera melakukan verifikasi data Anda</li>
                <li>✓ Anda akan menerima email konfirmasi dalam waktu 1x24 jam</li>
                <li>✓ Silakan siapkan dokumen fisik (KTP) untuk verifikasi saat pengambilan kunci</li>
                <li>✓ Pembayaran dapat dilakukan setelah reservasi dikonfirmasi oleh admin</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition duration-300"
              >
                Kembali ke Beranda
              </Link>
              <Link
                to="/#gedung"
                className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 rounded-lg font-semibold transition duration-300"
              >
                Lihat Gedung Lain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;