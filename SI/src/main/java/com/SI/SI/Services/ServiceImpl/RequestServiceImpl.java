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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final EmailService emailService;
    private final Random random = new Random();
    private static final Logger logger = LoggerFactory.getLogger(RequestServiceImpl.class);


    private String generateCnieNumber() {
        return String.format("CNIE%06d", random.nextInt(1000000));
    }

    private String generateNumeroPreDemande() {
        return String.format("PRE%06d", random.nextInt(1000000));
    }

    @Override
    public RequestDTO createRequest(RequestDTO requestDTO) {
        Request request = requestMapper.toEntity(requestDTO);
        request.setDateCreated(LocalDateTime.now());
        // Ensure CIN is null when creating
        request.setCnieNumber(null);

        // Generate numeroPreDemande
        String numeroPreDemande = generateNumeroPreDemande();
        request.setNumeroPreDemande(numeroPreDemande);

        Request savedRequest = requestRepository.save(request);

        // Send email notification about request creation
        sendRequestCreationEmail(savedRequest);

        return requestMapper.toDto(savedRequest);
    }

    private void sendRequestCreationEmail(Request request) {
        String userEmail = request.getEmail();
        if (userEmail == null || userEmail.isEmpty()) {
            // Log warning if email is not available
            logger.warn("No email address available for request: " + request.getId());
            return;
        }

        String subject = "Votre demande a été créée avec succès";
        String body = String.format(
                "Bonjour %s,\n\n" +
                        "Votre demande a été créée avec succès.\n" +
                        "Votre numéro de pré-demande est: %s\n\n" +
                        "Veuillez conserver ce numéro pour suivre l'état de votre demande.\n\n" +
                        "Cordialement,\n" +
                        "L'équipe de support",
                request.getPersonalInformation().getPrenom(),
                request.getNumeroPreDemande()
        );

        emailService.sendStatusUpdateEmail(userEmail, subject, body);
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

    private void sendStatusUpdateEmail(Request updatedRequest) {
        String userEmail = updatedRequest.getEmail();
        if (userEmail == null || userEmail.isEmpty()) {
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

        Request updatedRequest = requestMapper.toEntity(requestDTO);

        updatedRequest.setId(id);
        updatedRequest.setDateCreated(existingRequest.getDateCreated());
        updatedRequest.setDateUpdated(LocalDateTime.now());
        updatedRequest.setStatus(existingRequest.getStatus());
        updatedRequest.setCnieNumber(existingRequest.getCnieNumber());
        updatedRequest.setNumeroPreDemande(existingRequest.getNumeroPreDemande());


        Request savedRequest = requestRepository.save(updatedRequest);

        return requestMapper.toDto(savedRequest);
    }
}