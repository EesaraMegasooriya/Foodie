package com.example.foodapp.repository;

import java.util.Optional;
import com.example.foodapp.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByPostIdAndUserId(Long postId, Long userId); // one reaction per post/user
}
