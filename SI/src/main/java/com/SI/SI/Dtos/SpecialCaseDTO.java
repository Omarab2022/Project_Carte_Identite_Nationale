package com.SI.SI.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialCaseDTO {
    private Long id;
    private String objetDemande;
    private String raisonAssistance;
    private String natureAssistance;
    private String nom;
    private String prenom;
    private String adresseEtablissement;
}
