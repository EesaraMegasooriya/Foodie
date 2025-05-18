import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateRecipe() {
  const { recipeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(['']); // Changed to start with one ingredient
  const [instructions, setInstructions] = useState([{ text: '' }]);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [images, setImages] = useState([]);

  // Initialize state with passed data
  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setDescription(state.description);
      setIngredients(state.ingredients);
      setInstructions(state.instructions.map(text => ({ text })));
      setCookingTime(
        state.cookingTime !== undefined && state.cookingTime !== null
          ? String(state.cookingTime)
          : (state.cookTime !== undefined && state.cookTime !== null ? String(state.cookTime) : '')
      );
      // ...set other fields
    }
  }, [state]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
   
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!String(cookingTime).trim()) {
      newErrors.cookingTime = 'Cooking time is required';
    }

    if (instructions.filter(i => i.text.trim()).length < 1) {
      newErrors.instructions = 'At least 1 instruction is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, idx) => idx !== index);
    if (updated.length >= 1) {  // Allow removing as long as 1 field remains
      setIngredients(updated);
    }
  };

  const handleInstructionChange = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { text: '' }]);
  };

  const removeInstruction = (index) => {
    const updated = instructions.filter((_, idx) => idx !== index);
    setInstructions(updated.length ? updated : [{ text: '' }]); // Keep at least one instruction
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Validate minimum 3 ingredients only on submit
      const filledIngredients = ingredients.filter(i => i.trim());
      if (filledIngredients.length < 3) {
        setErrors(prev => ({
          ...prev,
          ingredients: 'At least 3 ingredients are required'
        }));
        return;
      }

      // Prepare updated recipe object (only ingredients and instructions)
      const updatedRecipe = {
        ...state,
        ingredients: ingredients.filter(i => i.trim()),
        instructions: instructions.filter(i => i.text.trim()).map(i => i.text)
      };

      try {
        const response = await fetch(`http://localhost:8080/api/recipes/${state.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedRecipe)
        });
        if (response.ok) {
          toast.success('Record Updated Successfully!', {
            onClose: () => navigate('/recipes')
          });
        } else {
          toast.error('Failed to update recipe.');
        }
      } catch (error) {
        toast.error('Error updating recipe.');
      }
    }
  };

  if (!state) {
    return <div className="container py-5">No recipe data provided.</div>;
  }

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Update Recipe</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/recipes')}
        >
          ← Back to Recipes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="card p-4 shadow-sm">
          <div className='row mb-4 mt-2'>
            <div className="col-6">
              <label className="form-label fw-semibold">Recipe Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                readOnly
              />
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Recipe Images</label>
              <div className="mb-3 text-center">
                <img
                  src={state.imageUrl.startsWith("/uploads/")
                    ? `http://localhost:8080${state.imageUrl}`
                    : state.imageUrl}
                  alt={state.title}
                  style={{
                    borderRadius: 12,
                    width: "100%",
                    maxWidth: 400,
                    height: 220,
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    display: "block",
                    margin: "0 auto"
                  }}
                />
              </div>
            </div>
          </div>

          <div className='row mb-4 mt-2'>
            <div className="col-6">
              <label className="form-label fw-semibold">Ingredients</label>
              {errors.ingredients && (
                <div className="alert alert-danger py-1">{errors.ingredients}</div>
              )}
              {ingredients.map((item, idx) => (
                <div className="input-group mb-2" key={idx}>
                  <input
                    type="text"
                    className="form-control"
                    value={item}
                    onChange={e => handleIngredientChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeIngredient(idx)}
                    disabled={ingredients.length <= 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addIngredient}
              >
                + Add Ingredient
              </button>
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Cooking Time</label>
              <input
                type="text"
                className="form-control"
                value={cookingTime}
                readOnly
              />
            </div>
          </div>

          <div className='row mb-4 mt-2'>
            <div className="col-6">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                value={description}
                readOnly
                rows="4"
              />
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">Instructions</label>
              {errors.instructions && (
                <div className="alert alert-danger py-1">{errors.instructions}</div>
              )}
              {instructions.map((step, idx) => (
                <div className="input-group mb-2" key={idx}>
                  <input
                    type="text"
                    className="form-control"
                    value={step.text}
                    onChange={e => handleInstructionChange(idx, "text", e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeInstruction(idx)}
                    disabled={instructions.length <= 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addInstruction}
              >
                + Add Instruction
              </button>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-warning btn-lg px-5 py-2 mt-4 shadow"
            >
              Update Recipe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateRecipe;