import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateRecipe() {
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
        // Validate minimum 3 ingredients only on submit
        const filledIngredients = ingredients.filter(i => i.trim());
        if (filledIngredients.length < 3) {
          setErrors(prev => ({
            ...prev,
            ingredients: 'At least 3 ingredients are required'
          }));
          return;
        }
  
        // Create form data with images
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('cookingTime', cookingTime);
        formData.append('ingredients', JSON.stringify(ingredients.filter(i => i.trim())));
        formData.append('instructions', JSON.stringify(instructions.filter(i => i.text.trim()).map(i => i.text)));
        
        // Append each image
        images.forEach((image, index) => {
          formData.append(`image${index}`, image);
        });
  
        // Log both the form data and a plain object for better console visibility
        console.log("Recipe Form Data:", formData);
        console.log("Recipe Data as Object:", {
          title,
          description,
          cookingTime,
          ingredients: ingredients.filter(i => i.trim()),
          instructions: instructions.filter(i => i.text.trim()).map(i => i.text),
          images: images.map(img => ({
            name: img.name,
            type: img.type,
            size: img.size
          }))
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
              Update Recipe
            </button>
          </div>
  </div>
        </form>
      </div>
    );
  }

export default UpdateRecipe;
