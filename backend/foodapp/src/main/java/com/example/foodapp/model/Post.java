package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Who created the post

    @Column(columnDefinition = "TEXT")
    private String caption;

    // We’ll link media, comments, and reactions separately
}
