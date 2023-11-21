import React, { useState } from 'react';
import Welcome from './Components/Welcome';

import AddFavorite from './Components/AddFavorite';
import FavoritesTable from './Components/FavoriteTable';

const App = () => {
  const [page, setPage] = useState('welcome');
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (favorite) => {
    setFavorites([...favorites, favorite]);
    setPage('favorites');
  };

  const handleView = (favorite) => {
    alert(`Viewing ${favorite.packageName}`);
  };

  const handleEdit = (favorite) => {
    alert(`Editing ${favorite.packageName}`);
  };

  const handleDelete = (favorite) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${favorite.packageName}?`);
    if (confirmDelete) {
      setFavorites(favorites.filter((fav) => fav.packageName !== favorite.packageName));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {page === 'welcome' && <Welcome onClickAdd={() => setPage('addFavorite')} />}
      {page === 'addFavorite' && <AddFavorite onSubmit={handleAddFavorite} />}
      {page === 'favorites' && (
        <FavoritesTable
          favorites={favorites}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
