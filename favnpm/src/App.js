import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import AddFavorite from "./Components/AddFavorite";
import FavoritesTable from "./Components/FavoriteTable";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (favorite) => {
    setFavorites([...favorites, favorite]);
  };

  return (
    <Routes>
      <Route
        path="/add"
        element={<AddFavorite onSubmit={handleAddFavorite} />}
      />

      <Route
        path="/"
        element={
          <FavoritesTable favorites={favorites} setFavorites={setFavorites} />
        }
      />
    </Routes>
  );
};

export default App;
