// FavoritesTable.js
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const FavoritesTable = ({ favorites, onView, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewedFavorite, setViewedFavorite] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedFavorite, setEditedFavorite] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');

  const handleDeleteClick = (favorite) => {
    setSelectedFavorite(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite) => {
    setViewedFavorite(favorite);
    setShowViewModal(true);
  };

  const handleEditClick = (favorite) => {
    setEditedFavorite(favorite);
    setEditedDescription(favorite.description || ''); // Assuming 'description' is a property in your favorite object
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedFavorite);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSaveEdit = () => {
    onEdit({ ...editedFavorite, description: editedDescription });
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
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
                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleViewClick(favorite)}>
                  <FaEye />
                </button>
                <button className="text-green-500 hover:underline mr-2" onClick={() => handleEditClick(favorite)}>
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
                <FaCheck />
              </button>
              <button className="text-red-500 hover:underline" onClick={handleCancelDelete}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Viewing Package: {viewedFavorite.packageName}</p>
            <p>Description: {viewedFavorite.description || 'No description available'}</p>
            <div className="flex justify-end">
              <button className="text-red-500 hover:underline" onClick={() => setShowViewModal(false)}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Editing Package: {editedFavorite.packageName}</p>
            <textarea
              placeholder="Edit Description"
              className="border p-2 mb-4 w-full"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <button className="text-green-500 hover:underline mr-2" onClick={handleSaveEdit}>
                <FaCheck />
              </button>
              <button className="text-red-500 hover:underline" onClick={handleCancelEdit}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesTable;
