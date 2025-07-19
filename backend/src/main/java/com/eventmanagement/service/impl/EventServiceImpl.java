package com.eventmanagement.service.impl;

import com.eventmanagement.dto.*;
import com.eventmanagement.model.*;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.RegistrationRepository;
import com.eventmanagement.service.EventService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    public EventServiceImpl(EventRepository eventRepository, RegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    public EventResponse createEvent(String organizerId, EventCreateRequest request) {
        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .organizerId(organizerId)
                .startDateTime(request.getStartDateTime())
                .endDateTime(request.getEndDateTime())
                .location(Event.Location.builder()
                        .type(request.getLocationType())
                        .address(request.getAddress())
                        .city(request.getCity())
                        .country(request.getCountry())
                        .virtualLink(request.getVirtualLink())
                        .build())
                .capacity(request.getCapacity())
                .registrationDeadline(request.getRegistrationDeadline())
                .status(EventStatus.PUBLISHED)
                .tags(request.getTags())
                .imageUrl(request.getImageUrl())
                .requirements(request.getRequirements())
                .agenda(request.getAgenda())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        eventRepository.save(event);
        return toEventResponse(event);
    }

    @Override
    public EventResponse updateEvent(String eventId, String userId, EventUpdateRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (!event.getOrganizerId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this event");
        }
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setStartDateTime(request.getStartDateTime());
        event.setEndDateTime(request.getEndDateTime());
        event.setLocation(Event.Location.builder()
                .type(request.getLocationType())
                .address(request.getAddress())
                .city(request.getCity())
                .country(request.getCountry())
                .virtualLink(request.getVirtualLink())
                .build());
        event.setCapacity(request.getCapacity());
        event.setRegistrationDeadline(request.getRegistrationDeadline());
        event.setTags(request.getTags());
        event.setImageUrl(request.getImageUrl());
        event.setRequirements(request.getRequirements());
        event.setAgenda(request.getAgenda());
        event.setUpdatedAt(LocalDateTime.now());
        eventRepository.save(event);
        return toEventResponse(event);
    }

    @Override
    public void deleteEvent(String eventId, String userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (!event.getOrganizerId().equals(userId)) {
            throw new SecurityException("Not authorized to delete this event");
        }
        // Soft delete: set status to CANCELLED
        event.setStatus(EventStatus.DRAFT); // Or a custom CANCELLED status if you add it
        event.setUpdatedAt(LocalDateTime.now());
        eventRepository.save(event);
    }

    @Override
    public EventResponse getEventById(String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return toEventResponse(event);
    }

    @Override
    public Page<EventResponse> listEvents(Pageable pageable) {
        return eventRepository.findAll(pageable).map(this::toEventResponse);
    }

    @Override
    public Page<EventResponse> searchEvents(String query, Pageable pageable) {
        // TODO: Implement full-text search using MongoDB text indexes
        return Page.empty();
    }

    @Override
    public Page<EventResponse> listEventsByOrganizer(String organizerId, Pageable pageable) {
        List<Event> events = eventRepository.findByOrganizerId(organizerId);
        List<EventResponse> responses = events.stream().map(this::toEventResponse).collect(Collectors.toList());
        // Manual pagination for now
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responses.size());
        return new org.springframework.data.domain.PageImpl<>(responses.subList(start, end), pageable, responses.size());
    }

    @Override
    public EventResponse updateEventStatus(String eventId, String userId, String status) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (!event.getOrganizerId().equals(userId)) {
            throw new RuntimeException("Not authorized to update status");
        }
        EventStatus newStatus = EventStatus.valueOf(status);
        // Enforce valid status transitions if needed
        event.setStatus(newStatus);
        event.setUpdatedAt(LocalDateTime.now());
        eventRepository.save(event);
        return toEventResponse(event);
    }

    @Override
    public List<String> listCategories() {
        return Arrays.stream(EventCategory.values()).map(Enum::name).collect(Collectors.toList());
    }

    private EventResponse toEventResponse(Event event) {
        EventResponse resp = new EventResponse();
        BeanUtils.copyProperties(event, resp);
        if (event.getLocation() != null) {
            resp.setLocationType(event.getLocation().getType());
            resp.setAddress(event.getLocation().getAddress());
            resp.setCity(event.getLocation().getCity());
            resp.setCountry(event.getLocation().getCountry());
            resp.setVirtualLink(event.getLocation().getVirtualLink());
        }
        int registeredCount = (int) registrationRepository.countByEventIdAndStatus(event.getId(), RegistrationStatus.CONFIRMED);
        resp.setRegisteredCount(registeredCount);
        return resp;
    }
} 