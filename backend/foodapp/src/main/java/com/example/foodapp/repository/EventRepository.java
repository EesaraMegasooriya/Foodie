package com.example.foodapp.repository;
import java.util.List;
import com.example.foodapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    

}

