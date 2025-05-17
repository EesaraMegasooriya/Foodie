package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // "image" or "video"

    private String url; // local path like "uploads/filename.jpg"

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
