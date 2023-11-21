import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFavorite = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [favoriteReason, setFavoriteReason] = useState('');

  useEffect(() => {
    if (searchQuery) {
      axios.get(`https://api.npms.io/v2/search?q=${searchQuery}`).then((response) => {
        setPackages(response.data.results);
      });
    }
  }, [searchQuery]);

  const handleAddFavorite = () => {
    if (selectedPackage && favoriteReason) {
      onSubmit({
        packageName: selectedPackage.package.name,
        favoriteReason,
      });
    }
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Favorite NPM Package</h2>
      <input
        type="text"
        placeholder="Search NPM Package"
        className="border p-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {packages.length > 0 && (
        <div className="mb-4">
          {packages.map((pkg) => (
            <div key={pkg.package.name} className="mb-2">
              <input
                type="radio"
                id={pkg.package.name}
                name="selectedPackage"
                value={pkg.package.name}
                checked={selectedPackage === pkg}
                onChange={() => setSelectedPackage(pkg)}
              />
              <label htmlFor={pkg.package.name} className="ml-2">
                {pkg.package.name}
              </label>
            </div>
          ))}
        </div>
      )}
      <textarea
        placeholder="Why is this your favorite?"
        className="border p-2 mb-4 w-full"
        value={favoriteReason}
        onChange={(e) => setFavoriteReason(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        onClick={handleAddFavorite}
      >
        Submit
      </button>
    </div>
  );
};

export default AddFavorite;