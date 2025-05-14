package com.example.foodapp.repository;

import com.example.foodapp.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByTagsContaining(String tag);
}
