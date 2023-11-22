import React from "react";
import { FaTimes } from "react-icons/fa";

interface ViewModalProps {
  onClose: () => void;
  viewedFavorite: {
    packageName: string;
    favoriteReason: string;
  } | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ onClose, viewedFavorite }) => {
  if (!viewedFavorite) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md h-auto w-80">
        <p className="text-lg font-bold mb-4" style={{ fontSize: '23px' }}>
          Viewing Package: {viewedFavorite.packageName}
        </p>
        <p className="text-lg font-bold mb-4" style={{ fontSize: '32px' }}>
          Description:{" "}
         
        </p>
        <p style={{ fontSize: '23px', overflowWrap: 'break-word' }}>
  {viewedFavorite.favoriteReason || "No description available"}
</p>



        <div className="flex justify-end">
          <button className="text-red-500 hover:underline" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
