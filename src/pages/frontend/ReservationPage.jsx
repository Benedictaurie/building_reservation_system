import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils/formatRupiah';

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    identityNumber: '',
    eventName: '',
    eventDate: '',
    eventDuration: 1,
    eventDescription: '',
    otpCode: ''
  });

  const buildingsData = {
    1: { name: 'Sasana Budaya', price_per_day: 2500000 },
    2: { name: 'Wantilan Pelabuhan Tua', price_per_day: 1500000 },
    3: { name: 'Gedung Kesenian', price_per_day: 2000000 },
    4: { name: 'Gedung Mr. Pudja', price_per_day: 3000000 }
  };

  useEffect(() => {
    setBuilding(buildingsData[id]);
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert('Masukkan email terlebih dahulu');
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    alert(`Kode OTP telah dikirim ke ${formData.email}`);
  };

  const handleVerifyOtp = () => {
    if (formData.otpCode === '123456') {
      setOtpVerified(true);
      alert('Verifikasi OTP berhasil!');
    } else {
      alert('Kode OTP salah. Silakan coba lagi.');
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = `SURAT PERMOHONAN SEWA GEDUNG
DINAS KEBUDAYAAN DAN PARIWISATA KABUPATEN BULELENG

Kepada Yth,
Kepala Dinas Kebudayaan dan Pariwisata
Kabupaten Buleleng
Di Tempat

Dengan hormat,
Yang bertanda tangan di bawah ini:

Nama: ${formData.fullName || '[Nama Lengkap]'}
NIK: ${formData.identityNumber || '[NIK]'}
Alamat: ${formData.address || '[Alamat]'}
No. Telepon: ${formData.phone || '[No. Telepon]'}

Bermaksud untuk mengajukan permohonan sewa gedung ${building?.name || '[Nama Gedung]'} dengan detail sebagai berikut:

Tanggal Pelaksanaan: ${formData.eventDate || '[Tanggal]'}
Durasi: ${formData.eventDuration || '[Durasi]'} hari
Nama Acara: ${formData.eventName || '[Nama Acara]'}
Deskripsi Acara: ${formData.eventDescription || '[Deskripsi Acara]'}

Demikian surat permohonan ini kami sampaikan. Atas perhatian dan izin yang diberikan, kami ucapkan terima kasih.

Hormat kami,
[${formData.fullName || 'Nama Lengkap'}]`;

    const blob = new Blob([templateContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Surat_Permohonan_Sewa_Gedung.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Silakan verifikasi email terlebih dahulu');
      return;
    }
    
    // Simulate reservation submission
    setTimeout(() => {
      navigate('/reservasi-sukses', { 
        state: { 
          buildingName: building?.name,
          eventDate: formData.eventDate,
          eventName: formData.eventName
        } 
      });
    }, 1000);
  };

  if (!building) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalPrice = building.price_per_day * formData.eventDuration;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <p className="mt-2 text-sm">Informasi Diri</p>
              </div>
              <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <p className="mt-2 text-sm">Verifikasi Email</p>
              </div>
              <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 text-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <p className="mt-2 text-sm">Detail Pemesanan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">
                Reservasi {building.name}
              </h1>
              <p className="text-gray-600 mt-1">Isi formulir di bawah ini untuk melakukan reservasi</p>
            </div>

            <form onSubmit={handleSubmitReservation}>
              <div className="p-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Nama Lengkap *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Nomor Telepon *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">NIK (KTP) *</label>
                        <input
                          type="text"
                          name="identityNumber"
                          value={formData.identityNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Alamat Lengkap *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                      ></textarea>
                    </div>

                    {/* Download Template Button */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">📄 Surat Permohonan Sewa Gedung</h3>
                      <p className="text-sm text-blue-600 mb-3">Unduh template surat permohonan, isi, dan unggah kembali nanti.</p>
                      <button
                        type="button"
                        onClick={handleDownloadTemplate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                      >
                        Download Template Surat
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Email Verification */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800">
                        Verifikasi email diperlukan untuk memastikan nomor telepon aktif dan 
                        memudahkan komunikasi jika ada perubahan jadwal.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Email Terdaftar</label>
                      <input
                        type="email"
                        value={formData.email}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                      />
                    </div>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                      >
                        Kirim Kode OTP
                      </button>
                    ) : !otpVerified && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Kode OTP</label>
                          <input
                            type="text"
                            name="otpCode"
                            value={formData.otpCode}
                            onChange={handleInputChange}
                            placeholder="Masukkan kode 6 digit"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            *Kode demo: 123456
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                        >
                          Verifikasi OTP
                        </button>
                      </div>
                    )}

                    {otpVerified && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-green-800 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Email berhasil diverifikasi!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Booking Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Nama Acara *</label>
                        <input
                          type="text"
                          name="eventName"
                          value={formData.eventName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Tanggal Pelaksanaan *</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Durasi (hari) *</label>
                        <input
                          type="number"
                          name="eventDuration"
                          value={formData.eventDuration}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Deskripsi Acara *</label>
                      <textarea
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Jelaskan secara singkat tentang acara yang akan diselenggarakan..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                      ></textarea>
                    </div>

                    {/* Upload Document Section */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="documentUpload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="documentUpload"
                        className="cursor-pointer inline-flex flex-col items-center"
                      >
                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-gray-600">Upload Surat Permohonan & Scan KTP</p>
                        <p className="text-sm text-gray-400 mt-1">PDF, DOC, atau DOCX (Max 5MB)</p>
                      </label>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Ringkasan Biaya</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Harga Sewa per Hari</span>
                          <span className="font-medium">{formatRupiah(building.price_per_day)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Durasi</span>
                          <span className="font-medium">{formData.eventDuration} hari</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-800">Total Biaya</span>
                            <span className="font-bold text-blue-600 text-xl">{formatRupiah(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50 border-t flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                  >
                    Kembali
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1) {
                        if (formData.fullName && formData.email && formData.phone && formData.identityNumber && formData.address) {
                          setStep(step + 1);
                        } else {
                          alert('Silakan lengkapi semua data diri terlebih dahulu');
                        }
                      } else if (step === 2) {
                        if (otpVerified) {
                          setStep(step + 1);
                        } else {
                          alert('Silakan verifikasi email terlebih dahulu');
                        }
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ml-auto"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ml-auto"
                  >
                    Kirim Reservasi
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;