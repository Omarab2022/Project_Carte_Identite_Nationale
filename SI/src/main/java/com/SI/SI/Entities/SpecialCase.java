package com.SI.SI.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "special_cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "objet_demande", nullable = false)
    private String objetDemande;

    @Column(name = "raison_assistance", nullable = false)
    private String raisonAssistance;

    @Column(name = "nature_assistance", nullable = false)
    private String natureAssistance;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "adresse_etablissement", nullable = false)
    private String adresseEtablissement;

    // Relations
    @OneToOne(mappedBy = "specialCase")
    private Request request;
}
