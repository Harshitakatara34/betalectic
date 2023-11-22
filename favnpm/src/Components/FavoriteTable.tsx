import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Welcome from "./Welcome";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";

interface Favorite {
  id: string; 
  packageName: string;
  favoriteReason: string;
}

const FavoritesTable: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedFavorite, setViewedFavorite] = useState<Favorite | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editedFavorite, setEditedFavorite] = useState<Favorite | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]") as Favorite[];
    setFavorites(storedFavorites);
  }, []);
  

  const handleDeleteClick = (favorite: Favorite) => {
    console.log(favorite)
    setSelectedFavorite(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite: Favorite) => {
    setViewedFavorite(favorite);
    setShowViewModal(true);
  };

  const handleEditClick = (favorite: Favorite) => {
    setEditedFavorite(favorite);
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== selectedFavorite.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
      setFavorites(updatedFavorites);
      setShowDeleteModal(false);
    }
  };
  
  
  
  
  
  const handleViewModalClose = () => {
    setShowViewModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedPackage: string, editedDescription: string) => {
    if (editedFavorite) {
      const updatedFavorites = favorites.map((fav) =>
        fav.id === editedFavorite.id
          ? {
              ...fav,
              favoriteReason: editedDescription,
              packageName: editedPackage,
            }
          : fav
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
      setFavorites(updatedFavorites);
      setShowEditModal(false);
    }
  };
  

  const handleAddNewPackage = () => {
    navigate("/add");
  };

  return (
    <div className="mt-8">
      {favorites.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Favorites</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleAddNewPackage}
            >
              Add New Package
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Package Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.id}>
                  <td className="border px-4 py-2">{favorite.packageName}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleViewClick(favorite)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-green-500 hover:underline mr-2"
                      onClick={() => handleEditClick(favorite)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:underline mr-2"
                      onClick={() => handleDeleteClick(favorite)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Welcome onClickAdd={handleAddNewPackage}  />
      )}

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-4">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-end">
              <button
                className="text-green-500 hover:underline mr-2"
                onClick={handleConfirmDelete}
              >
                <FaCheck />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => setShowDeleteModal(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <ViewModal
          onClose={handleViewModalClose}
          viewedFavorite={viewedFavorite as Favorite}
        />
      )}

      {showEditModal && (
        <EditModal
          onClose={handleEditModalClose}
          editedFavorite={editedFavorite as Favorite}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default FavoritesTable;
