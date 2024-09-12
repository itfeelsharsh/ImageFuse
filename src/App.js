import React, { useState, useEffect, useCallback } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import Modal from './Modal';
import Navbar from './Navbar';
import Footer from './Footer';

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm', 'video/ogg',
  'audio/mpeg', 'audio/wav', 'audio/ogg',
  'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-rar-compressed'
];

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('hasAgreedToTerms');
    if (hasAgreed) {
      setHasAgreedToTerms(true);
    } else {
      setShowPermissionsModal(true);
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (ALLOWED_TYPES.includes(selectedFile.type)) {
        setFile(selectedFile);
        setNotification({ message: '', type: '' });
      } else {
        setFile(null);
        setNotification({ message: 'Invalid file type. Please select a valid file.', type: 'warning' });
      }
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (!hasAgreedToTerms) {
      setNotification({ message: 'You must agree to the Terms of Service before uploading.', type: 'warning' });
      return;
    }

    if (!file) {
      setNotification({ message: 'No file selected. Please choose a file to upload.', type: 'warning' });
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    const randomFileName = uuidv4().substring(0, 8);
    const storageRef = ref(storage, `files/${randomFileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setLoading(false);
        setNotification({ message: 'File upload failed. Please try again.', type: 'error' });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setLoading(false);
          setNotification({ message: 'File uploaded successfully!', type: 'success' });
          setShowModal(true);
        });
      }
    );
  }, [file, hasAgreedToTerms]);

  const handleCopyLink = useCallback(() => {
    if (url) {
      navigator.clipboard.writeText(url);
      setNotification({ message: 'Link copied to clipboard!', type: 'success' });
      setShowCopyLinkModal(true);
    }
  }, [url]);

  const handleAgreement = useCallback(() => {
    localStorage.setItem('hasAgreedToTerms', 'true');
    setHasAgreedToTerms(true);
    setShowPermissionsModal(false);
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <div className="uploader-card">
        <h1 className="title">File Uploader</h1>

        <div className="file-input-container">
          <input 
            type="file" 
            id="file" 
            onChange={handleFileChange} 
            className="file-input" 
            aria-label="Choose file" 
          />
          <label htmlFor="file" className="file-input-label">
            Choose File
          </label>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="loading-text">Uploading...</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          </div>
        ) : (
          <button onClick={handleUpload} className="upload-button">
            <FiUploadCloud className="button-icon" />
            Upload
          </button>
        )}

        {notification.message && (
          <div className={`notification ${notification.type}`}>
            <FiCheckCircle className="notification-icon" />
            <span>{notification.message}</span>
          </div>
        )}
      </div>

      <Modal
        title="File Uploaded Successfully"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>Your file has been uploaded successfully. You can access it using the link below:</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="file-link">
          Access File
        </a>
        <div className="file-notices">
          <ul>
            <li>Please save this link securely. Without it, the file cannot be accessed.</li>
            <li>Files are stored permanently, but we reserve the right to delete any file that violates our terms.</li>
            <li>Ensure that your file complies with our acceptable usage policy to avoid deletion.</li>
            <li>This file is private and can only be accessed through this unique link.</li>
          </ul>
        </div>
        <button onClick={handleCopyLink} className="copy-button">
          Copy Link
        </button>
      </Modal>

      <Modal
        title="Link Copied"
        isOpen={showCopyLinkModal}
        onClose={() => setShowCopyLinkModal(false)}
      >
        <p>The file link has been copied to your clipboard. You can paste it anywhere to access your file.</p>
      </Modal>

      <Modal
        title="Welcome to File Uploader"
        isOpen={showPermissionsModal}
        onClose={() => {}}
      >
        <p>Before you begin, please review and agree to our Terms of Service and Privacy Policy.</p>
        <p>By agreeing, you consent to the collection and use of your data as outlined in our Privacy Policy.</p>
        <button onClick={handleAgreement} className="agreement-button">
          I Agree
        </button>
      </Modal>

      <Footer />
    </div>
  );
}

export default App;