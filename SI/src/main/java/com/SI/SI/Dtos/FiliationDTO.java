package com.SI.SI.Dtos;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FiliationDTO {
    private Long id;
    private String prenomPere;
    private String nomPere;
    private String prenomMere;
    private String nomMere;
    private String prenomGrandPerePaternel;
    private String nomGrandPerePaternel;
    private String prenomGrandPereMaternel;
    private String nomGrandPereMaternel;
}
