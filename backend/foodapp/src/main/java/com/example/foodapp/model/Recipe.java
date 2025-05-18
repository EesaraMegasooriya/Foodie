package com.example.foodapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Author is required")
    private String userid;

    @NotBlank(message = "image is required")
    private String imageUrl;

    @NotBlank(message = "Title is required")
    private String title;

    @Lob
    @NotBlank(message = "Description is required")
    private String description;

    @ElementCollection
    private List<String> ingredients;

    @ElementCollection
    private List<String> instructions;

    private Integer cookingTime;
}
