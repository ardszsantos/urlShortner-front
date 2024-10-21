import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';  // Import icons for the toggler
import { useTheme } from '../ThemeProvider';  // Use theme from ThemeProvider

const MainPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const { theme, toggleTheme } = useTheme();  // Destructure theme and toggleTheme

  // Function to copy the short URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://urlshortner-back.onrender.com/url', { longUrl });
      setShortUrl(response.data);
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className="app container-fluid vh-100 d-flex flex-column justify-content-center align-items-center px-3">
      <div className="theme-toggler" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
        {theme === 'light' ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
      </div>
      <h1 className="text-center mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-100 w-md-75 w-lg-50">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button className="btn btn-primary rounded-pill" type="submit">
            Shorten
          </button>
        </div>
      </form>
      {shortUrl && (
        <div className="input-group mt-4 w-100 w-md-75 w-lg-50">
          <input
            type="text"
            className="form-control rounded-pill"
            value={shortUrl}
            readOnly
          />
          <button className="btn btn-outline-secondary rounded-pill" onClick={copyToClipboard}>
            <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
  
};

export default MainPage;
