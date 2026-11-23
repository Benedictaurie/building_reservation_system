import React, { useState } from 'react';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([
    { 
      id: 1, 
      customerName: 'I Wayan Sudana', 
      building: 'Sasana Budaya', 
      date: '2026-06-20', 
      duration: 1,
      status: 'Pending',
      email: 'wayan@email.com',
      phone: '081234567890',
      eventName: 'Pentas Seni Budaya'
    },
    { 
      id: 2, 
      customerName: 'Ni Luh Putri', 
      building: 'Wantilan Pelabuhan Tua', 
      date: '2026-06-22', 
      duration: 2,
      status: 'Disetujui',
      email: 'putri@email.com',
      phone: '081234567891',
      eventName: 'Upacara Adat'
    },
    { 
      id: 3, 
      customerName: 'Made Artawan', 
      building: 'Gedung Kesenian', 
      date: '2026-06-25', 
      duration: 1,
      status: 'Pending',
      email: 'artawan@email.com',
      phone: '081234567892',
      eventName: 'Pementasan Teater'
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disetujui': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Disetujui' } : r
    ));
    alert('Reservasi berhasil disetujui!');
  };

  const handleReject = (id) => {
    if (confirm('Apakah Anda yakin ingin menolak reservasi ini?')) {
      setReservations(reservations.map(r => 
        r.id === id ? { ...r, status: 'Ditolak' } : r
      ));
      alert('Reservasi ditolak');
    }
  };

  const handleViewDetail = (reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Kelola Reservasi</h2>
        <p className="text-gray-600">Kelola dan verifikasi permohonan reservasi gedung</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b">
        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">Semua</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Pending</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Disetujui</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Ditolak</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyewa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gedung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{reservation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.building}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.duration} hari</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetail(reservation)}
                      className="text-gray-600 hover:text-gray-800 mr-3"
                    >
                      Detail
                    </button>
                    {reservation.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(reservation.id)}
                          className="text-green-600 hover:text-green-800 mr-3"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleReject(reservation.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Detail Reservasi #{selectedReservation.id}</h3>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="font-medium">{selectedReservation.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedReservation.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="font-medium">{selectedReservation.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gedung</p>
                  <p className="font-medium">{selectedReservation.building}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nama Acara</p>
                  <p className="font-medium">{selectedReservation.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p className="font-medium">{selectedReservation.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Durasi</p>
                  <p className="font-medium">{selectedReservation.duration} hari</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedReservation.status)}`}>
                    {selectedReservation.status}
                  </span>
                </div>
              </div>
              
              {selectedReservation.status === 'Pending' && (
                <div className="border-t pt-4 mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      handleReject(selectedReservation.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedReservation.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Setujui
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;