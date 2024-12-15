package com.SI.SI.Controllers;


import com.SI.SI.Dtos.PersonalInformationDTO;
import com.SI.SI.Dtos.RequestDTO;
import com.SI.SI.Dtos.RequestStatusUpdateDTO;
import com.SI.SI.Enums.PersonType;
import com.SI.SI.Enums.RequestStatus;
import com.SI.SI.Services.EmailService;
import com.SI.SI.Services.EmployeeService;
import com.SI.SI.Services.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;
    private final EmployeeService employeeService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody RequestDTO requestDTO) {

        if (requestDTO.getPersonType() == PersonType.MAROCAIN) {
            PersonalInformationDTO pi = requestDTO.getPersonalInformation();
            if (pi.getReferenceArreteNationalite() != null || pi.getDateArreteNationalite() != null) {
                return ResponseEntity.badRequest().body("Foreign-specific fields should not be set for Moroccan persons.");
            }
            if (pi.getCommuneResidence() == null || pi.getCommuneResidence().isEmpty()) {
                return ResponseEntity.badRequest().body("communeResidence is required for Moroccan persons.");
            }
        } else if (requestDTO.getPersonType() == PersonType.ETRANGER) {
            PersonalInformationDTO pi = requestDTO.getPersonalInformation();
            if (pi.getCommuneResidence() != null && !pi.getCommuneResidence().isEmpty()) {
                return ResponseEntity.badRequest().body("communeResidence should not be set for Foreign persons.");
            }
            if (pi.getReferenceArreteNationalite() == null || pi.getReferenceArreteNationalite().isEmpty()) {
                return ResponseEntity.badRequest().body("ReferenceArreteNationalite is required for Foreign persons.");
            }
            if (pi.getDateArreteNationalite() == null) {
                return ResponseEntity.badRequest().body("DateArreteNationalite is required for Foreign persons.");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid person type.");
        }

        RequestDTO createdRequest = requestService.createRequest(requestDTO);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllRequests(@RequestHeader("Authorization") String authHeader) {
        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRequestStatus(
            @PathVariable Long id,
            @RequestBody RequestStatusUpdateDTO statusUpdate,
            @RequestHeader("Authorization") String authHeader) {
        if (!isAuthenticated(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        try {
            RequestDTO updatedRequest = requestService.updateRequestStatus(id, statusUpdate);
            return ResponseEntity.ok(updatedRequest);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search/numero")
    public ResponseEntity<?> findByNumeroPreDemande(
            @RequestParam String numeroPreDemande) {
        RequestDTO request = requestService.findByNumeroPreDemande(numeroPreDemande);
        if (request == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No request found with numero pre-demande: " + numeroPreDemande);
        }
        return ResponseEntity.ok(request);
    }

    @GetMapping("/search/cin")
    public ResponseEntity<RequestDTO> findByCin(@RequestParam String cin) {
        RequestDTO request = requestService.findByCin(cin);
        if (request == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(request);
    }

    private boolean isAuthenticated(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7);
        return employeeService.validateToken(token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestDTO> getRequestById(@PathVariable Long id) {
        RequestDTO request = requestService.findById(id);
        if (request == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRequest(
            @PathVariable Long id,
            @RequestBody RequestDTO requestDTO
    ) {
        try {

            if (requestDTO.getPersonType() == PersonType.MAROCAIN) {
                PersonalInformationDTO pi = requestDTO.getPersonalInformation();
                if (pi.getReferenceArreteNationalite() != null || pi.getDateArreteNationalite() != null) {
                    return ResponseEntity.badRequest().body("Foreign-specific fields should not be set for Moroccan persons.");
                }
                if (pi.getCommuneResidence() == null || pi.getCommuneResidence().isEmpty()) {
                    return ResponseEntity.badRequest().body("communeResidence is required for Moroccan persons.");
                }
            } else if (requestDTO.getPersonType() == PersonType.ETRANGER) {
                PersonalInformationDTO pi = requestDTO.getPersonalInformation();
                if (pi.getCommuneResidence() != null && !pi.getCommuneResidence().isEmpty()) {
                    return ResponseEntity.badRequest().body("communeResidence should not be set for Foreign persons.");
                }
                if (pi.getReferenceArreteNationalite() == null || pi.getReferenceArreteNationalite().isEmpty()) {
                    return ResponseEntity.badRequest().body("ReferenceArreteNationalite is required for Foreign persons.");
                }
                if (pi.getDateArreteNationalite() == null) {
                    return ResponseEntity.badRequest().body("DateArreteNationalite is required for Foreign persons.");
                }
            } else {
                return ResponseEntity.badRequest().body("Invalid person type.");
            }

            RequestDTO updatedRequest = requestService.updateRequest(id, requestDTO);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}