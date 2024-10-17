import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';

const MainPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // Function to copy the short URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/url', { longUrl });
      setShortUrl(response.data);
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-50">
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
        <div className="input-group mt-4 w-50">
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
