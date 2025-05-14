package com.example.foodapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 50, message = "Title must not exceed 50 characters")
    private String title;

    @Lob
    private String description;

    @ElementCollection
    private List<String> ingredients;

    @Lob
    private String preparationSteps;

    private int cookingTime; // in minutes

    @ElementCollection
    private Set<String> tags;

    private double averageRating = 0.0;

}
