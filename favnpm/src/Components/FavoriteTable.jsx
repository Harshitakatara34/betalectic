// FavoritesTable.js
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash,FaCheck,FaTimes } from 'react-icons/fa';

const FavoritesTable = ({ favorites, onView, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  const handleDeleteClick = (favorite) => {
    setSelectedFavorite(favorite);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedFavorite);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Package Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite) => (
            <tr key={favorite.packageName}>
              <td className="border px-4 py-2">{favorite.packageName}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 hover:underline mr-2" onClick={() => onView(favorite)}>
                  <FaEye />
                </button>
                <button className="text-green-500 hover:underline mr-2" onClick={() => onEdit(favorite)}>
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:underline mr-2" onClick={() => handleDeleteClick(favorite)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-end">
              <button className="text-green-500 hover:underline mr-2" onClick={handleConfirmDelete}>
                <FaCheck /> {/* Assuming you have a check icon */}
              </button>
              <button className="text-red-500 hover:underline" onClick={handleCancelDelete}>
                <FaTimes /> {/* Assuming you have a times (cross) icon */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesTable;
