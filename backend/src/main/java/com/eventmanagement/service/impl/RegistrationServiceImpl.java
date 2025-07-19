package com.eventmanagement.service.impl;

import com.eventmanagement.dto.*;
import com.eventmanagement.model.*;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.RegistrationRepository;
import com.eventmanagement.service.RegistrationService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public RegistrationServiceImpl(RegistrationRepository registrationRepository, EventRepository eventRepository) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public RegistrationResponse register(String userId, RegistrationCreateRequest request) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (registrationRepository.existsByEventIdAndUserId(event.getId(), userId)) {
            throw new RuntimeException("Already registered for this event");
        }
        long confirmedCount = registrationRepository.findByEventId(event.getId()).stream()
                .filter(r -> r.getStatus() == RegistrationStatus.CONFIRMED)
                .count();
        RegistrationStatus status = confirmedCount < event.getCapacity() ? RegistrationStatus.CONFIRMED : RegistrationStatus.WAITLISTED;
        Registration reg = Registration.builder()
                .eventId(event.getId())
                .userId(userId)
                .status(status)
                .registrationDate(LocalDateTime.now())
                .notes(request.getNotes())
                .attended(false)
                .build();
        registrationRepository.save(reg);
        return toResponse(reg);
    }

    @Override
    public RegistrationResponse updateRegistration(String registrationId, RegistrationUpdateRequest request) {
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        reg.setStatus(request.getStatus());
        reg.setNotes(request.getNotes());
        registrationRepository.save(reg);
        return toResponse(reg);
    }

    @Override
    public void cancelRegistration(String registrationId, String userId) {
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        if (!reg.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized to cancel this registration");
        }
        reg.setStatus(RegistrationStatus.CANCELLED);
        registrationRepository.save(reg);
    }

    @Override
    public RegistrationResponse markAttendance(String registrationId, boolean attended) {
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        reg.setAttended(attended);
        registrationRepository.save(reg);
        return toResponse(reg);
    }

    @Override
    public List<RegistrationResponse> getRegistrationsByUser(String userId) {
        return registrationRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<RegistrationResponse> getRegistrationsByEvent(String eventId) {
        return registrationRepository.findByEventId(eventId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<com.eventmanagement.dto.EventResponse> getRegisteredEventsForUser(String userId) {
        return registrationRepository.findByUserId(userId).stream()
                .map(reg -> eventRepository.findById(reg.getEventId())
                        .map(event -> {
                            com.eventmanagement.dto.EventResponse resp = new com.eventmanagement.dto.EventResponse();
                            org.springframework.beans.BeanUtils.copyProperties(event, resp);
                            if (event.getLocation() != null) {
                                resp.setLocationType(event.getLocation().getType());
                                resp.setAddress(event.getLocation().getAddress());
                                resp.setCity(event.getLocation().getCity());
                                resp.setCountry(event.getLocation().getCountry());
                                resp.setVirtualLink(event.getLocation().getVirtualLink());
                            }
                            return resp;
                        })
                        .orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public List<RegistrationResponse> getConfirmedRegistrationsByUser(String userId) {
        return registrationRepository.findByUserId(userId).stream()
            .filter(reg -> reg.getStatus() == RegistrationStatus.CONFIRMED)
            .map(this::toResponse)
            .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public List<ConfirmedRegistrationWithEventResponse> getConfirmedRegistrationsWithEventByUser(String userId) {
        return registrationRepository.findByUserId(userId).stream()
            .filter(reg -> reg.getStatus() == RegistrationStatus.CONFIRMED)
            .map(reg -> {
                Event event = eventRepository.findById(reg.getEventId()).orElse(null);
                if (event == null) return null;
                ConfirmedRegistrationWithEventResponse dto = new ConfirmedRegistrationWithEventResponse();
                RegistrationResponse regResp = toResponse(reg);
                EventResponse eventResp = new EventResponse();
                org.springframework.beans.BeanUtils.copyProperties(event, eventResp);
                if (event.getLocation() != null) {
                    eventResp.setLocationType(event.getLocation().getType());
                    eventResp.setAddress(event.getLocation().getAddress());
                    eventResp.setCity(event.getLocation().getCity());
                    eventResp.setCountry(event.getLocation().getCountry());
                    eventResp.setVirtualLink(event.getLocation().getVirtualLink());
                }
                dto.setRegistration(regResp);
                dto.setEvent(eventResp);
                return dto;
            })
            .filter(java.util.Objects::nonNull)
            .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public List<ConfirmedRegistrationWithEventResponse> getActiveRegistrationsWithEventByUser(String userId) {
        return registrationRepository.findByUserId(userId).stream()
            .filter(reg -> reg.getStatus() != RegistrationStatus.CANCELLED)
            .map(reg -> {
                Event event = eventRepository.findById(reg.getEventId()).orElse(null);
                if (event == null) return null;
                ConfirmedRegistrationWithEventResponse dto = new ConfirmedRegistrationWithEventResponse();
                RegistrationResponse regResp = toResponse(reg);
                EventResponse eventResp = new EventResponse();
                org.springframework.beans.BeanUtils.copyProperties(event, eventResp);
                if (event.getLocation() != null) {
                    eventResp.setLocationType(event.getLocation().getType());
                    eventResp.setAddress(event.getLocation().getAddress());
                    eventResp.setCity(event.getLocation().getCity());
                    eventResp.setCountry(event.getLocation().getCountry());
                    eventResp.setVirtualLink(event.getLocation().getVirtualLink());
                }
                dto.setRegistration(regResp);
                dto.setEvent(eventResp);
                return dto;
            })
            .filter(java.util.Objects::nonNull)
            .collect(java.util.stream.Collectors.toList());
    }

    private RegistrationResponse toResponse(Registration reg) {
        RegistrationResponse resp = new RegistrationResponse();
        BeanUtils.copyProperties(reg, resp);
        return resp;
    }
} 