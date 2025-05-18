import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeCreate() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(['']); // Changed to start with one ingredient
  const [instructions, setInstructions] = useState([{ text: '' }]);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [images, setImages] = useState([]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!cookingTime.trim()) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const filledIngredients = ingredients.filter(i => i.trim());
      if (filledIngredients.length < 3) {
        setErrors(prev => ({
          ...prev,
          ingredients: 'At least 3 ingredients are required'
        }));
        return;
      }

      const formData = new FormData();
      const recipeData = {
        title,
        description,
        cookingTime,
        ingredients: filledIngredients,
        instructions: instructions.filter(i => i.text.trim()).map(i => i.text),
        userid: "dummy-user"
      };
      formData.append('data', new Blob([JSON.stringify(recipeData)], { type: 'application/json' }));
      images.forEach((image) => formData.append('image', image));

      fetch('http://localhost:8080/api/recipes/', {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          if (res.ok) {
            // Redirect or show success
            navigate('/recipes');
          } else {
            alert('Failed to submit recipe');
          }
        })
        .catch(() => {
          alert('Network error');
        });
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="mb-0 fw-bold">Create a New Recipe</h2>
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
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              placeholder="Enter recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Recipe Images */}
        <div className="col-6">
        
            <label className="form-label fw-semibold">Recipe Images</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <div className='row mb-4 mt-2'>
        <div className="col-6">
        
            <label className="form-label fw-semibold">Ingredients</label>
            {errors.ingredients && (
              <div className="alert alert-danger py-1">{errors.ingredients}</div>
            )}
            {ingredients.map((ingredient, idx) => (
              <div key={idx} className="mb-3 d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Ingredient ${idx + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(idx, e.target.value)}
                  required
                />
                <div className="d-flex gap-1">
                  {idx === ingredients.length - 1 && (
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="btn btn-outline-primary"
                    >
                      +
                    </button>
                  )}
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="btn btn-outline-danger"
                    >
                      −
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="col-6">
        
            <label className="form-label fw-semibold">Cooking Time</label>
            <input
              type="text"
              className={`form-control ${errors.cookingTime ? 'is-invalid' : ''}`}
              placeholder="Enter cooking time..."
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              required
            />
            {errors.cookingTime && <div className="invalid-feedback">{errors.cookingTime}</div>}
          </div>

       
          </div>
        
        <div className='row mb-4 mt-2'>
        <div className="col-6">
        
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              placeholder="Enter recipe description..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

         <div className="col-6">
            <label className="form-label fw-semibold">Instructions</label>
            {errors.instructions && (
              <div className="alert alert-danger py-1">{errors.instructions}</div>
            )}
            {instructions.map((instruction, idx) => (
              <div key={idx} className="mb-4 d-flex gap-2">
                <textarea
                  className="form-control mb-2"
                  placeholder={`Instruction ${idx + 1}`}
                  rows="3"
                  value={instruction.text}
                  onChange={(e) => handleInstructionChange(idx, 'text', e.target.value)}
                  required
                />
                <div className="d-flex flex-column gap-1">
                  {idx === instructions.length - 1 && (
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="btn btn-outline-primary"
                    >
                      +
                    </button>
                  )}
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(idx)}
                      className="btn btn-outline-danger"
                    >
                      −
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        

        {/* Submit Button */}
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-warning btn-lg px-5 py-2 mt-4 shadow"
          >
            Submit Recipe
          </button>
        </div>
</div>
      </form>
    </div>
  );
}

export default RecipeCreate;
