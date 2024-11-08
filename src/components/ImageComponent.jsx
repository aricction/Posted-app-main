import React, { useEffect } from 'react';

const loadImageWithCORS = (src, callback) => {
  const img = new Image();
  img.crossOrigin = "Anonymous"; // Important for cross-origin images
  img.src = src;
  img.onload = () => callback(img);
  img.onerror = (err) => console.error("Image load error: ", err);
};

const ImageComponent = () => {
  useEffect(() => {
    const imageURL = 'https://via.placeholder.com/150'; // Replace with your actual image URL

    loadImageWithCORS(imageURL, (img) => {
      const canvas = document.getElementById('yourCanvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
      }
    });
  }, []);

  return (
    <canvas id="yourCanvas" width="500" height="500" style={{ border: '1px solid black' }}></canvas>
  );
};

export default ImageComponent;
