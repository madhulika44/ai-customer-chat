import React, { useState } from 'react';
import axios from 'axios';
import './AdminUpload.css'; // optional styling

function AdminUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

 const handleUpload = async () => {
  if (!file) return alert('Please select a .txt file');

  const formData = new FormData();
  formData.append('faqFile', file);

  try {
    const response = await axios.post('/api/admin/upload-faq-file', formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log("✅ Upload response:", response);

    // Display entire response in case message is missing
    setMessage('✅ Upload success. Server says: ' + (response.data.message || 'No message received.'));

  } catch (error) {
    console.error("❌ Upload error:", error.response || error.message || error);
    const errMsg =
      error?.response?.data?.error ||
      error?.message ||
      'Unknown error';
    setMessage('❌ Upload failed: ' + errMsg);
  }
};

  return (
    <div className="admin-upload">
      <h2>Upload FAQ (.txt)</h2>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminUpload;
