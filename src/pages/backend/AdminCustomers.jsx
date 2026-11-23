import React, { useState } from 'react';
import { formatRupiah } from '../../utils/formatRupiah';

const AdminBuildings = () => {
  const [buildings, setBuildings] = useState([
    { id: 1, name: 'Sasana Budaya', capacity: 500, price: 2500000, status: 'Aktif' },
    { id: 2, name: 'Wantilan Pelabuhan Tua', capacity: 300, price: 1500000, status: 'Aktif' },
    { id: 3, name: 'Gedung Kesenian', capacity: 400, price: 2000000, status: 'Aktif' },
    { id: 4, name: 'Gedung Mr. Pudja', capacity: 200, price: 3000000, status: 'Aktif' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  const handleAddBuilding = () => {
    setEditingBuilding(null);
    setIsModalOpen(true);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
    setIsModalOpen(true);
  };

  const handleDeleteBuilding = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus gedung ini?')) {
      setBuildings(buildings.filter(b => b.id !== id));
    }
  };

  const getStatusColor = (status) => {
    return status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Gedung</h2>
          <p className="text-gray-600">Tambah, edit, atau hapus data gedung</p>
        </div>
        <button
          onClick={handleAddBuilding}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Gedung
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Gedung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kapasitas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga/Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {buildings.map((building) => (
                <tr key={building.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{building.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{building.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{building.capacity} orang</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatRupiah(building.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(building.status)}`}>
                      {building.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEditBuilding(building)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBuilding(building.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Building */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingBuilding ? 'Edit Gedung' : 'Tambah Gedung Baru'}
            </h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Gedung</label>
                  <input
                    type="text"
                    defaultValue={editingBuilding?.name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Kapasitas</label>
                  <input
                    type="number"
                    defaultValue={editingBuilding?.capacity || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Harga per Hari</label>
                  <input
                    type="number"
                    defaultValue={editingBuilding?.price || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={editingBuilding?.status || 'Aktif'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBuildings;