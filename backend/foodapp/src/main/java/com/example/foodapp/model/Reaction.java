package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // who liked/unliked

    private String type; // "like" or "unlike"

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
