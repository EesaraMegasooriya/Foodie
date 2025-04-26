package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // who wrote the comment

    @Column(columnDefinition = "TEXT")
    private String content; // actual comment text

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
