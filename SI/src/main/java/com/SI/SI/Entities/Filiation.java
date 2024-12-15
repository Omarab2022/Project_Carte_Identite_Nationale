package com.SI.SI.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "filiations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Filiation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prenom_pere", nullable = false)
    private String prenomPere;

    @Column(name = "nom_pere")
    private String nomPere;

    @Column(name = "prenom_mere", nullable = false)
    private String prenomMere;

    @Column(name = "nom_mere")
    private String nomMere;

    @Column(name = "prenom_grand_pere_paternel")
    private String prenomGrandPerePaternel;

    @Column(name = "nom_grand_pere_paternel")
    private String nomGrandPerePaternel;

    @Column(name = "prenom_grand_pere_maternel")
    private String prenomGrandPereMaternel;

    @Column(name = "nom_grand_pere_maternel")
    private String nomGrandPereMaternel;

    // Relations
    @OneToOne(mappedBy = "filiation")
    private PersonalInformation personalInformation;
}
