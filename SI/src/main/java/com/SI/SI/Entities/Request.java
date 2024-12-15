package com.SI.SI.Entities;

import com.SI.SI.Enums.PersonType;
import com.SI.SI.Enums.RequestStatus;
import com.SI.SI.Enums.RequestType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private RequestType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RequestStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "person_type", nullable = false) // New field
    private PersonType personType;

    @Column(name = "date_created", nullable = false)
    private LocalDateTime dateCreated;

    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    @Column(name = "numero_pre_demande", unique = true, nullable = false)
    private String numeroPreDemande;

    @Column(name = "cnie_number", unique = true)
    private String cnieNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    // Champs pour CAS PARTICULIERS
    @Column(name = "objet_demande")
    private String objetDemande;

    @Column(name = "raison_assistance")
    private String raisonAssistance;

    @Column(name = "nature_assistance")
    private String natureAssistance;

    @Column(name = "nom_etablissement")
    private String nomEtablissement;

    // New field to store the police center date
    @Column(name = "police_center_date")
    private LocalDate policeCenterDate;


    // Relations
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_information_id", referencedColumnName = "id")
    private PersonalInformation personalInformation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "special_case_id", referencedColumnName = "id")
    private SpecialCase specialCase;
}

