package com.eventmanagement.repository;

import com.eventmanagement.model.Event;
import com.eventmanagement.model.EventCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByOrganizerId(String organizerId);
    List<Event> findByCategory(EventCategory category);
} 