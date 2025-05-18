import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If you use navigation for update
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FoodieUserHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchError) setSearchError("");
    if (value.length > 0 && value.length < 2) {
      setSearchError("Search term must be at least 2 characters");
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    searchQuery.length < 2 ? true :
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Handlers copied from ViewRecipe.jsx ---
  const handleUpdate = () => {
    // Navigate to update page with selected recipe data
    navigate(`/recipes/update-recipe/${selectedRecipe.id}`, { state: selectedRecipe });
  };

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipes/${selectedRecipe.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setShowConfirmDialog(false);
        setSelectedRecipe(null);
        // Remove deleted recipe from list
        setRecipes(recipes.filter(r => r.id !== selectedRecipe.id));
      } else {
        alert("Failed to delete recipe.");
      }
    } catch (error) {
      alert("Error deleting recipe.");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-3 mb-md-0">
          <h1 className="display-4 fw-bold">Be the chef of your Kitchen</h1>
          <p className="text-muted">
            Discover more than 100 food recipes to boost your kitchen skills. Start your foodie journey here!
          </p>
          <button
            className="btn btn-warning mt-2"
            style={{ minWidth: 150, fontWeight: 600 }}
            onClick={() => navigate("/recipes/create-recipe")}
          >
            + Create Recipe
          </button>
        </div>
        <div className="col-md-6 d-flex flex-column flex-md-row align-items-stretch gap-2">
          <div className="input-group mb-2 mb-md-0">
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

      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <p>Loading recipes...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
              key={recipe.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="card h-100 w-100 shadow-sm">
                <img
                  src={recipe.imageUrl.startsWith("/uploads/")
                    ? `http://localhost:8080${recipe.imageUrl}`
                    : recipe.imageUrl}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "220px",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem"
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted mb-2">⏱ {recipe.cookingTime} mins</p>
                  <p className="card-text text-truncate">{recipe.description}</p>
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

      {/* Expanded Card for Selected Recipe */}
      {selectedRecipe && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: 10
          }}
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 720,
              width: "100%",
              padding: 16,
              position: "relative",
              maxHeight: "95vh",
              overflowY: "auto",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                fontWeight: "bold",
                fontSize: 18,
                cursor: "pointer",
                zIndex: 10
              }}
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h1 style={{ fontWeight: "900", fontSize: 26, textAlign: "center" }}>
              {selectedRecipe.title}
            </h1>
            <p style={{ fontWeight: "700", fontSize: 16, color: "#555", textAlign: "center", marginTop: -10 }}>
              {selectedRecipe.subtitle}
            </p>
            <p style={{ fontWeight: "400", fontSize: 15, color: "#777", textAlign: "center", marginTop: 5, marginBottom: 20 }}>
              {selectedRecipe.description}
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <img
                src={selectedRecipe.imageUrl.startsWith("/uploads/")
                  ? `http://localhost:8080${selectedRecipe.imageUrl}`
                  : selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                style={{
                  borderRadius: 12,
                  width: "100%",
                  maxWidth: 400,
                  height: 220,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "block"
                }}
              />
            </div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              flexDirection: window.innerWidth < 768 ? "column" : "row"
            }}>
              <section style={{ flex: "2 1 300px", minWidth: 220 }}>
                <h2 style={{ fontWeight: "700", fontSize: 20, marginBottom: 10 }}>Instructions</h2>
                <ol style={{ lineHeight: 1.5, fontSize: 15, color: "#333", paddingLeft: 20 }}>
                  {(selectedRecipe.instructions || []).map((step, idx) => (
                    <li key={idx} style={{ marginBottom: 10 }}>{step}</li>
                  ))}
                </ol>
              </section>
              <section style={{ flex: "1 1 180px", backgroundColor: "#f9f5f1", borderRadius: 12, padding: 12 }}>
                <h3 style={{ fontWeight: "700", fontSize: 18, marginBottom: 10, borderBottom: "2px solid #e5cba7", paddingBottom: 4 }}>Ingredients</h3>
                <ul style={{ paddingLeft: 20, fontSize: 15, color: "#555" }}>
                  {(selectedRecipe.ingredients || []).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 5 }}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            {/* Action Buttons */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 30,
              padding: "20px 0"
            }}>
              <button
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: "600"
                }}
                onClick={handleUpdate}
              >
                Update Recipe
              </button>
              <button
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: "600"
                }}
                onClick={handleDelete}
              >
                Delete Recipe
              </button>
            </div>
            {/* Confirmation Dialog */}
            {showConfirmDialog && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3000
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  maxWidth: '400px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ marginBottom: '20px' }}>Are you sure that you want to delete this Recipe?</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                      onClick={handleConfirmDelete}
                      style={{
                        padding: "8px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: "600"
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      style={{
                        padding: "8px 20px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: "600"
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
