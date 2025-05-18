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

    @PostMapping(consumes = "multipart/form-data")
    public Recipe createRecipe(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("instructions") String instructions,
            @RequestParam("cookingTime") int cookingTime,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            // Save image to disk
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            String filepath = UPLOAD_DIR + filename;
            image.transferTo(new File(filepath));

            String imageUrl = "/uploads/" + filename;

            // Create Recipe object manually
            Recipe recipe = new Recipe();
            recipe.setTitle(title);
            recipe.setDescription(description);
            recipe.setIngredients(List.of(ingredients.split(",")));
            recipe.setInstructions(List.of(instructions.split(",")));
            recipe.setCookingTime(cookingTime);
            recipe.setImageUrl(imageUrl); // Set image URL here

            // Use your existing service method to save the recipe
            return recipeService.createRecipe(recipe); // Directly return the saved recipe

        } catch (IOException e) {
            // You can handle the error as you see fit
            throw new RuntimeException("Error while saving the image", e);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.updateRecipe(id, recipe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

}
