package com.example.foodapp.controller;

import com.example.foodapp.model.Event;
import com.example.foodapp.service.EventService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private JavaMailSender mailSender; // Inject JavaMailSender

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
            @RequestParam String email // accept email from frontend
    ) {
        Event updatedEvent = eventService.registerUser(id, userId);

        // After successful registration, send an email
        sendRegistrationEmail(email, updatedEvent.getTitle(), updatedEvent.getEventDate().toString());

        return updatedEvent;
    }

    // Unregister a user from an event
    @PutMapping("/{id}/unregister")
    public Event unregisterUser(@PathVariable Long id, @RequestParam Long userId) {
        return eventService.unregisterUser(id, userId);
    }

    // Helper method to send email
    private void sendRegistrationEmail(String toEmail, String eventTitle, String eventDate) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Event Registration Confirmation - " + eventTitle);
        message.setText(
            "Hello!\n\n" +
            "You have successfully registered for the event:\n\n" +
            "Event: " + eventTitle + "\n" +
            "Date: " + eventDate + "\n\n" +
            "We are excited to have you join!\n\n" +
            "- FoodApp Team"
        );
        mailSender.send(message);
    }
}
