import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const recipes = [
  {
    title: "Tofu Tomatoes Soup",
    time: "15 mins",
    rating: "4.0",
    image: "tofu-soup.jpg",
  },
  {
    title: "Crunchy Potatoes",
    time: "20 mins",
    rating: "4.2",
    image: "crunchy-potatoes.jpg",
  },
  {
    title: "Beef Teriyaki",
    time: "35 mins",
    rating: "4.6",
    image: "beef-teriyaki.jpg",
  },
];

export default function FoodieUserHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleCreateRecipe = () => {
    navigate('/recipes/create-recipe');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear error when input is valid
    if (searchError) setSearchError("");
    
    // Validate search input
    if (value.length > 0 && value.length < 2) {
      setSearchError("Search term must be at least 2 characters");
    }
  };

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe => 
    searchQuery.length < 2 ? true : 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">Be the chef of your Kitchen</h1>
          <p className="text-muted">
            Discover more than 100 food recipes to boost your kitchen skills. Start your foodie journey here!
          </p>
          <button className="btn btn-warning" onClick={handleCreateRecipe}>Create New Recipe</button>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input 
              type="text" 
              className={`form-control ${searchError ? 'is-invalid' : ''}`}
              placeholder="Search for a recipe..." 
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchError && (
              <div className="invalid-feedback">
                {searchError}
              </div>
            )}
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4" id="recipeTabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">Recipes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Liked Recipes</a>
        </li>
      </ul>

      <div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img src={`/${recipe.image}`} alt={recipe.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted">⏱ {recipe.time} • ⭐ {recipe.rating}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No recipes found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
