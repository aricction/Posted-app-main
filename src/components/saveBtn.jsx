// Save.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Save = ({ setSuccess, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    if (!isLoggedIn) {
      setSuccess('');
      //navigate('/login');
    } else {
      setSuccess('User session saved successfully!');
      console.log('Saved');
    }
  };

  return (
    <div>
      <button
        className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Save;
