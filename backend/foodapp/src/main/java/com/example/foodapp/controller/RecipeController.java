package com.example.foodapp.controller;

import com.example.foodapp.model.Recipe;
import com.example.foodapp.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/")
    public ResponseEntity<Recipe> createRecipe(
            @RequestPart("data") Recipe recipe,
            @RequestPart(value = "image", required = false) List<MultipartFile> images
    ) throws IOException {
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }
                File dest = new File(UPLOAD_DIR + fileName);
                image.transferTo(dest);
                // If you want to store only one image URL:
                recipe.setImageUrl("/uploads/" + fileName);
                // If you want to store multiple image URLs, use a List<String> in Recipe and add each URL
            }
        }
        Recipe saved = recipeService.createRecipe(recipe);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipe) {
        // Only update ingredients and instructions
        Recipe existing = recipeService.getRecipeById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        existing.setIngredients(recipe.getIngredients());
        existing.setInstructions(recipe.getInstructions());
        Recipe updated = recipeService.updateRecipe(id, existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        // 1. Find the recipe to get the image URL
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe != null && recipe.getImageUrl() != null) {
            // 2. Build the file path
            String imagePath = UPLOAD_DIR + recipe.getImageUrl().replace("/uploads/", "");
            File imageFile = new File(imagePath);
            // 3. Delete the file if it exists
            if (imageFile.exists()) {
                imageFile.delete();
            }
        }
        // 4. Delete the recipe from the database
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

}
