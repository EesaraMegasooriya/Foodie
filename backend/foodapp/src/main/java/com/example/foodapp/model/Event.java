package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "events")
@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder // Optional, for building Event objects easily
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String eventDate;
    
    private String likes;

    private String eventTime;

    private String location;

    private String category;

    private String registrationFee;

    private String maxParticipants;

    private String instructorName;

    @Column(columnDefinition = "TEXT")
    private String instructorBio;

    private Long userId;
}
