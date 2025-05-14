import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateRecipe() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState([{ text: '', image: null }]);

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleInstructionChange = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { text: '', image: null }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Submitted");
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate('/')}
        >
          ← Back to Recipes
        </button>
        <h2 className="mb-0 fw-bold text-primary">Update the Recipe</h2>
      </div>

      <form onSubmit={handleSubmit} className="row g-4">

        {/* Recipe Title */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Recipe Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter recipe title"
              required
            />
          </div>
        </div>

        {/* Recipe Images */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Recipe Images</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter recipe description..."
              rows="4"
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Ingredients</label>
            {ingredients.map((ingredient, idx) => (
              <div key={idx} className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Ingredient ${idx + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(idx, e.target.value)}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="btn btn-outline-primary"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Instructions</label>
            {instructions.map((instruction, idx) => (
              <div key={idx} className="mb-4">
                <textarea
                  className="form-control mb-2"
                  placeholder={`Instruction ${idx + 1}`}
                  rows="3"
                  value={instruction.text}
                  onChange={(e) => handleInstructionChange(idx, 'text', e.target.value)}
                  required
                />
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleInstructionChange(idx, 'image', e.target.files[0])}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="btn btn-outline-success"
            >
              + Add Instruction
            </button>
          </div>
        </div>

        {/* Additional Note */}
        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <label className="form-label fw-semibold">Additional Note</label>
            <textarea
              className="form-control"
              placeholder="Any additional notes..."
              rows="3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg px-5 py-2 mt-4 shadow"
          >
           Update Recipe
          </button>
        </div>

      </form>
    </div>
  );
}

export default UpdateRecipe;
