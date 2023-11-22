import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

interface Package {
  package: {
    name: string;
  };
}

interface AddFavoriteProps {
  onSubmit: (newFavorite: { id: string; packageName: string; favoriteReason: string }) => void;
}

const AddFavorite: React.FC<AddFavoriteProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [favoriteReason, setFavoriteReason] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.npms.io/v2/search?q=${searchQuery}`)
        .then((response) => {
          setPackages(response.data.results);
        });
    }
  }, [searchQuery]);

  const handleAddFavorite = () => {
    if (selectedPackage && favoriteReason) {
      // Generate a unique id using uuid
      const id = uuidv4();

      const newFavorite = {
        id,
        packageName: selectedPackage.package.name,
        favoriteReason,
      };

      const existingFavorites =
        JSON.parse(localStorage.getItem("favorites") || "[]");
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existingFavorites, newFavorite])
      );

      onSubmit(newFavorite);
      navigate("/");
    } else {
      alert("Please select a package and enter a reason for your favorite.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center mt-8">
        Add Favorite NPM Package
      </h2>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search NPM Package"
          className="border p-2 mb-4 w-full text-center mt-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "90%" }}
        />
      </div>
      {packages.length > 0 && (
        <div className="mb-4 max-h-40 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 ml-20">Results</h1>
          <div className="grid grid-cols-1 gap-2 ml-20">
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
        </div>
      )}

      <div className="flex justify-center items-center">
        <textarea
          placeholder="Why is this your favorite?"
          className="border p-2 mb-4 w-full h-20 text-center"
          value={favoriteReason}
          style={{ width: "90%" }}
          onChange={(e) => setFavoriteReason(e.target.value)}
        />
      </div>
      <br />
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={handleAddFavorite}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddFavorite;
