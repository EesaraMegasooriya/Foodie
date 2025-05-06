package com.example.foodapp.controller;

import com.example.foodapp.model.Event;
import com.example.foodapp.service.EmailService;
import com.example.foodapp.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allow React frontend to connect
@RequiredArgsConstructor
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private EmailService emailService; // Use the new EmailService class

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return eventService.updateEvent(id, updatedEvent);
    }

    // Register a user to an event and send confirmation email
    @PutMapping("/{id}/register")
    public Event registerUser(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestParam String email) {

        Event updatedEvent = eventService.registerUser(id, userId);

        // Send confirmation email
        emailService.sendRegistrationEmail(email, updatedEvent.getTitle(), updatedEvent.getEventDate().toString());

        return updatedEvent;
    }

    // Unregister a user from an event
    @PutMapping("/{id}/unregister")
    public Event unregisterUser(@PathVariable Long id, @RequestParam Long userId) {
        return eventService.unregisterUser(id, userId);
    }
}
