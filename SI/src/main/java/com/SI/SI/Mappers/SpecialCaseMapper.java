package com.SI.SI.Mappers;

import com.SI.SI.Dtos.SpecialCaseDTO;
import com.SI.SI.Entities.SpecialCase;
import org.springframework.stereotype.Component;

@Component
public class SpecialCaseMapper {

    public SpecialCaseDTO toDto(SpecialCase entity) {
        if (entity == null) {
            return null;
        }

        return SpecialCaseDTO.builder()
                .id(entity.getId())
                .objetDemande(entity.getObjetDemande())
                .raisonAssistance(entity.getRaisonAssistance())
                .natureAssistance(entity.getNatureAssistance())
                .nom(entity.getNom())
                .prenom(entity.getPrenom())
                .adresseEtablissement(entity.getAdresseEtablissement())
                .build();
    }

    public SpecialCase toEntity(SpecialCaseDTO dto) {
        if (dto == null) {
            return null;
        }

        return SpecialCase.builder()
                .id(dto.getId())
                .objetDemande(dto.getObjetDemande())
                .raisonAssistance(dto.getRaisonAssistance())
                .natureAssistance(dto.getNatureAssistance())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .adresseEtablissement(dto.getAdresseEtablissement())
                .build();
    }
}