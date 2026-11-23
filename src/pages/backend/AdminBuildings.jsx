// src/pages/backend/AdminBuildings.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Import API service
import { formatRupiah } from '../../utils/formatRupiah';

const AdminBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  // State untuk menampung input form (termasuk rates dan gambar)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    capacity: '',
    status: 'active',
    rates: [
      { category: 'commercial', price: '', duration_type: 'per_day', note: '' }
    ],
    image: null
  });

  // Fetch data saat komponen dimuat
  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await api.get('/admin/buildings'); // Pastikan route admin benar
      setBuildings(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBuilding = () => {
    setEditingBuilding(null);
    setFormData({
      name: '', address: '', description: '', capacity: '', status: 'active',
      rates: [{ category: 'commercial', price: '', duration_type: 'per_day', note: '' }],
      image: null
    });
    setIsModalOpen(true);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
    setFormData({
      name: building.name,
      address: building.address,
      description: building.description,
      capacity: building.capacity,
      status: building.status,
      // Pastikan rates di-copy, jika kosong buat array baru
      rates: building.rates.length > 0 ? building.rates : [{ category: 'commercial', price: '', duration_type: 'per_day', note: '' }],
      image: null // File gambar tidak diambil dari database, hanya diisi jika ingin ganti
    });
    setIsModalOpen(true);
  };

  const handleDeleteBuilding = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus gedung ini?')) {
      try {
        await api.delete(`/admin/buildings/${id}`);
        fetchBuildings(); // Refresh data
      } catch (error) {
        alert("Gagal menghapus gedung");
      }
    }
  };

  // Handler untuk input standar
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler untuk input rates (dinamis)
  const handleRateChange = (index, field, value) => {
    const newRates = [...formData.rates];
    newRates[index][field] = value;
    setFormData({ ...formData, rates: newRates });
  };

  const addRateField = () => {
    setFormData({
      ...formData,
      rates: [...formData.rates, { category: 'social', price: '', duration_type: 'per_day', note: '' }]
    });
  };

  const removeRateField = (index) => {
    const newRates = formData.rates.filter((_, i) => i !== index);
    setFormData({ ...formData, rates: newRates });
  };

  // SUBMIT FORM (CREATE/UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gunakan FormData karena ada upload file dan array
    const data = new FormData();
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('description', formData.description);
    data.append('capacity', formData.capacity);
    data.append('status', formData.status);

    // Masukkan array rates ke FormData
    formData.rates.forEach((rate, index) => {
      data.append(`rates[${index}][category]`, rate.category);
      data.append(`rates[${index}][price]`, rate.price);
      data.append(`rates[${index}][duration_type]`, rate.duration_type);
      data.append(`rates[${index}][note]`, rate.note);
    });

    // Masukkan file gambar jika ada
    if (formData.image) {
      // Backend mengharapkan array untuk images (berdasarkan validasi 'image.array')
      // Karena kita hanya upload 1 gambar di UI, kita append ke index 0
      data.append('image[0]', formData.image);
    }

    try {
      if (editingBuilding) {
        // Laravel form data dengan method PUT perlu di-spoofing (jika validasi bermasalah)
        // Atau gunakan method POST dengan _method=PUT
        data.append('_method', 'PUT'); 
        await api.post(`/admin/buildings/${editingBuilding.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/buildings', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalOpen(false);
      fetchBuildings(); // Refresh data tabel
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error(error.response?.data);
      alert('Terjadi kesalahan saat menyimpan data. Cek console.');
    }
  };

  if (isLoading) return <div className="p-6 text-center">Memuat data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Gedung</h2>
        </div>
        <button onClick={handleAddBuilding} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Gedung
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Gedung</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kapasitas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buildings.map((building) => {
              const mainImage = building.images && building.images.length > 0 
                ? `http://localhost:8000/storage/${building.images[0].image}` : 'https://via.placeholder.com/150';
              return (
                <tr key={building.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><img src={mainImage} alt={building.name} className="w-16 h-12 object-cover rounded" /></td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{building.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{building.capacity} orang</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${building.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {building.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button onClick={() => handleEditBuilding(building)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDeleteBuilding(building.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingBuilding ? 'Edit Gedung' : 'Tambah Gedung Baru'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nama Gedung</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Kapasitas</label>
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Alamat</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="2" className="w-full px-4 py-2 border rounded-lg"></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                  <option value="active">Aktif</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
              
              {/* Upload Gambar */}
              <div>
                <label className="block text-gray-700 mb-2">Upload Gambar (Maks 6)</label>
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full px-4 py-2 border rounded-lg" />
                {editingBuilding && <p className="text-xs text-red-500 mt-1">*Biarkan kosong jika tidak ingin mengubah gambar</p>}
              </div>

              {/* Rates / Tarif */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-bold">Tarif Sewa (Rates)</label>
                  <button type="button" onClick={addRateField} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">+ Tambah Tarif</button>
                </div>
                {formData.rates.map((rate, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-start bg-gray-50 p-3 rounded-lg border">
                    <div className="flex-1">
                      <select value={rate.category} onChange={(e) => handleRateChange(index, 'category', e.target.value)} className="w-full border p-1 rounded text-sm">
                        <option value="commercial">Komersial</option>
                        <option value="social">Sosial</option>
                        <option value="all">Semua</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <input type="number" placeholder="Harga" value={rate.price} onChange={(e) => handleRateChange(index, 'price', e.target.value)} required className="w-full border p-1 rounded text-sm" />
                    </div>
                    <div className="flex-1">
                      <input type="text" placeholder="Catatan (ex: 6 s/d 24 jam)" value={rate.note} onChange={(e) => handleRateChange(index, 'note', e.target.value)} className="w-full border p-1 rounded text-sm" />
                    </div>
                    {formData.rates.length > 1 && (
                      <button type="button" onClick={() => removeRateField(index)} className="text-red-500 font-bold px-2">X</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBuildings;