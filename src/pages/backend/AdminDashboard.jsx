import React from 'react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Gedung', value: '4', change: '+0', color: 'bg-blue-500' },
    { title: 'Reservasi Pending', value: '12', change: '+5', color: 'bg-yellow-500' },
    { title: 'Reservasi Disetujui', value: '48', change: '+12', color: 'bg-green-500' },
    { title: 'Reservasi Ditolak', value: '3', change: '+1', color: 'bg-red-500' },
  ];

  const recentReservations = [
    { id: 1, name: 'I Wayan Sudana', building: 'Sasana Budaya', date: '2026-06-20', status: 'Pending' },
    { id: 2, name: 'Ni Luh Putri', building: 'Wantilan Pelabuhan Tua', date: '2026-06-22', status: 'Disetujui' },
    { id: 3, name: 'Made Artawan', building: 'Gedung Kesenian', date: '2026-06-25', status: 'Pending' },
    { id: 4, name: 'Komang Sri', building: 'Gedung Mr. Pudja', date: '2026-06-28', status: 'Pending' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disetujui': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Selamat datang di panel admin SIREN</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm">{stat.change}</span>
              <span className="text-gray-500 text-sm ml-1">dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Reservasi Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Penyewa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gedung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{reservation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.building}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Detail</button>
                    <button className="text-green-600 hover:text-green-800">Setujui</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;