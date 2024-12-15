package com.SI.SI.Entities;

import com.SI.SI.Enums.EtatCivil;
import com.SI.SI.Enums.Sexe;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "personal_informations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;

    @Column(name = "date_naissance_jj", nullable = false)
    private Integer dateNaissanceJj;

    @Column(name = "date_naissance_mm", nullable = false)
    private Integer dateNaissanceMm;

    @Column(name = "date_naissance_aaaa", nullable = false)
    private Integer dateNaissanceAaaa;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Sexe sexe;

    @Column(name = "pays_naissance", nullable = false)
    private String paysNaissance;

    @Column(name = "province_naissance", nullable = false)
    private String provinceNaissance;

    @Column(name = "commune_naissance", nullable = false)
    private String communeNaissance;

    @Column(name = "lieu_naissance")
    private String lieuNaissance;

    @Column(name = "nationalite_origine", nullable = false)
    private String nationaliteOrigine;

    @Column(name = "type_profession", nullable = false)
    private String typeProfession;

    @Column(name = "profession", nullable = false)
    private String profession;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat_civil", nullable = false)
    private EtatCivil etatCivil;

    @Column(name = "numero_etat_civil")
    private String numeroEtatCivil;

    @Column(name = "annee_etat_civil")
    private Integer anneeEtatCivil;

    @Column(name = "situation_famille")
    private String situationFamille;

    @Column(name = "pays_residence", nullable = false)
    private String paysResidence;

    @Column(name = "province_residence", nullable = false)
    private String provinceResidence;

    @Column(name = "commune_residence") // Made nullable
    private String communeResidence;

    @Column(name = "adresse", nullable = false)
    private String adresse;

    // New fields for Foreign persons
    @Column(name = "reference_arrete_nationalite")
    private String referenceArreteNationalite;

    @Column(name = "date_arrete_nationalite")
    private LocalDate dateArreteNationalite;

    // Relations
    @OneToOne(mappedBy = "personalInformation")
    private Request request;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "filiation_id", referencedColumnName = "id")
    private Filiation filiation;
}
