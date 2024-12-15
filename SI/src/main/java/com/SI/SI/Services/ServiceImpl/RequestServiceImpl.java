package com.SI.SI.Services.ServiceImpl;

import com.SI.SI.Dtos.RequestDTO;
import com.SI.SI.Dtos.RequestStatusUpdateDTO;
import com.SI.SI.Entities.Request;
import com.SI.SI.Enums.RequestStatus;
import com.SI.SI.Mappers.RequestMapper;
import com.SI.SI.Repository.RequestRepository;
import com.SI.SI.Services.EmailService;
import com.SI.SI.Services.RequestService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final EmailService emailService;
    private final Random random = new Random();

    private String generateCnieNumber() {
        return String.format("CNIE%06d", random.nextInt(1000000));
    }

    @Override
    public RequestDTO createRequest(RequestDTO requestDTO) {
        Request request = requestMapper.toEntity(requestDTO);
        request.setDateCreated(LocalDateTime.now());
        // Ensure CIN is null when creating
        request.setCnieNumber(null);
        Request savedRequest = requestRepository.save(request);
        return requestMapper.toDto(savedRequest);
    }

    public List<RequestDTO> getAllRequests() {
        return requestRepository.findAll().stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RequestDTO updateRequestStatus(Long id, RequestStatusUpdateDTO statusUpdate) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Request with id " + id + " not found"));

        RequestStatus previousStatus = request.getStatus();

        request.setStatus(statusUpdate.getStatus());

        if (statusUpdate.getStatus() == RequestStatus.COMPLETEE && request.getCnieNumber() == null) {
            request.setCnieNumber(generateCnieNumber());
        }

        if (statusUpdate.getStatus() == RequestStatus.ALLER_CENTRE_POLICE) {
            if (statusUpdate.getPoliceCenterDate() == null) {
                throw new IllegalArgumentException("Police center date is required when setting status to ALLER_CENTRE_POLICE.");
            }
            if (statusUpdate.getPoliceCenterDate().isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("Police center date cannot be in the past.");
            }
            request.setPoliceCenterDate(statusUpdate.getPoliceCenterDate());
        } else {
            request.setPoliceCenterDate(null);
        }

        request.setDateUpdated(LocalDateTime.now());

        Request updatedRequest = requestRepository.save(request);

        // Send email notification about status update
        sendStatusUpdateEmail(updatedRequest);

        return requestMapper.toDto(updatedRequest);
    }

    // Helper method to send status update email
    private void sendStatusUpdateEmail(Request updatedRequest) {
        String userEmail = updatedRequest.getEmail();
        if (userEmail == null || userEmail.isEmpty()) {
            // Optionally, log or handle cases where email is not available
            return;
        }

        String subject = "Votre demande a été mise à jour";
        String body = String.format(
                "Bonjour %s,\n\nVotre demande (N° %s) a été mise à jour.\nNouveau statut: %s.\n\nCordialement,\nL'équipe de support",
                updatedRequest.getPersonalInformation().getPrenom(),
                updatedRequest.getNumeroPreDemande(),
                updatedRequest.getStatus().name()
        );

        emailService.sendStatusUpdateEmail(userEmail, subject, body);
    }


    public RequestDTO findByNumeroPreDemande(String numeroPreDemande) {
        Request request = requestRepository.findByNumeroPreDemande(numeroPreDemande)
                .orElse(null);
        return requestMapper.toDto(request);
    }

    public RequestDTO findByCin(String cin) {
        Optional<Request> optionalRequest = requestRepository.findByCnieNumber(cin);
        if (optionalRequest.isPresent()) {
            return requestMapper.toDto(optionalRequest.get());
        }
        return null;
    }

    public RequestDTO findById(Long id) {
        return requestRepository.findById(id)
                .map(requestMapper::toDto)
                .orElse(null);
    }

    @Override
    public RequestDTO updateRequest(Long id, RequestDTO requestDTO) {
        Request existingRequest = requestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Request with id " + id + " not found"));

        // Map the updated DTO to the existing entity while preserving certain fields
        Request updatedRequest = requestMapper.toEntity(requestDTO);

        // Preserve fields that shouldn't be modified during update
        updatedRequest.setId(id);
        updatedRequest.setDateCreated(existingRequest.getDateCreated());
        updatedRequest.setDateUpdated(LocalDateTime.now());
        updatedRequest.setStatus(existingRequest.getStatus()); // Preserve status - it should only be modified through updateRequestStatus
        updatedRequest.setCnieNumber(existingRequest.getCnieNumber()); // Preserve CNIE number
        updatedRequest.setNumeroPreDemande(existingRequest.getNumeroPreDemande()); // Preserve pre-demand number

        // Save the updated request
        Request savedRequest = requestRepository.save(updatedRequest);

        // Map back to DTO and return
        return requestMapper.toDto(savedRequest);
    }
}