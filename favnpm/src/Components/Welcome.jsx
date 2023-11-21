// Welcome.js
import React from 'react';

const Welcome = ({ onClickAdd }) => {
  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to Favorite NPM Packages</h1>
      <div className="flex flex-col items-center border-dotted border border-gray-500 p-4" style={{ height: '300px', marginTop: '70px' }}>
        <span className="mb-4 mt-20">You don't have any favorites yet. Please add.</span>
        {/* Adjust the mt-{value} based on your requirement */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={onClickAdd}
        >
          Add Favorite
        </button>
      </div>
    </div>
  );
};

export default Welcome;
