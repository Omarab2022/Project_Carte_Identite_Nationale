package com.SI.SI.Dtos;


import com.SI.SI.Enums.EtatCivil;
import com.SI.SI.Enums.Sexe;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalInformationDTO {
    private Long id;
    private String nom;
    private String prenom;
    private Integer dateNaissanceJj;
    private Integer dateNaissanceMm;
    private Integer dateNaissanceAaaa;
    private Sexe sexe;
    private String paysNaissance;
    private String provinceNaissance;
    private String communeNaissance;
    private String lieuNaissance;
    private String nationaliteOrigine;
    private String typeProfession;
    private String profession;
    private EtatCivil etatCivil;
    private String numeroEtatCivil;
    private Integer anneeEtatCivil;
    private String situationFamille;
    private String paysResidence;
    private String provinceResidence;
    private String communeResidence;
    private String adresse;

    // New fields for Foreign persons
    private String referenceArreteNationalite;
    private LocalDate dateArreteNationalite;

    private FiliationDTO filiation;
}

