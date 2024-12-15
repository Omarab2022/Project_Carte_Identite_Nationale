package com.SI.SI.Dtos;

import com.SI.SI.Enums.PersonType;
import com.SI.SI.Enums.RequestStatus;
import com.SI.SI.Enums.RequestType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

// RequestDTO.java (Ensure nested DTOs are included)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestDTO {
    private Long id;
    private RequestType type;
    private RequestStatus status;
    private PersonType personType; // New field
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
    private String numeroPreDemande;
    private String cnieNumber;
    private LocalDate dateOfBirth;
    private String email;
    private String telephone;
    private String emergencyContact;
    private String objetDemande;
    private String raisonAssistance;
    private String natureAssistance;
    private String nomEtablissement;
    private LocalDate policeCenterDate;
    private PersonalInformationDTO personalInformation;
    private SpecialCaseDTO specialCase;
}



