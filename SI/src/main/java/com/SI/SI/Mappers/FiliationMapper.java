package com.SI.SI.Mappers;


import com.SI.SI.Dtos.FiliationDTO;
import com.SI.SI.Entities.Filiation;
import org.springframework.stereotype.Component;


@Component
public class FiliationMapper {

    public FiliationDTO toDto(Filiation entity) {
        if (entity == null) {
            return null;
        }

        return FiliationDTO.builder()
                .id(entity.getId())
                .prenomPere(entity.getPrenomPere())
                .nomPere(entity.getNomPere())
                .prenomMere(entity.getPrenomMere())
                .nomMere(entity.getNomMere())
                .prenomGrandPerePaternel(entity.getPrenomGrandPerePaternel())
                .nomGrandPerePaternel(entity.getNomGrandPerePaternel())
                .prenomGrandPereMaternel(entity.getPrenomGrandPereMaternel())
                .nomGrandPereMaternel(entity.getNomGrandPereMaternel())
                .build();
    }

    public Filiation toEntity(FiliationDTO dto) {
        if (dto == null) {
            return null;
        }

        Filiation filiation = Filiation.builder()
                .id(dto.getId())
                .prenomPere(dto.getPrenomPere())
                .nomPere(dto.getNomPere())
                .prenomMere(dto.getPrenomMere())
                .nomMere(dto.getNomMere())
                .prenomGrandPerePaternel(dto.getPrenomGrandPerePaternel())
                .nomGrandPerePaternel(dto.getNomGrandPerePaternel())
                .prenomGrandPereMaternel(dto.getPrenomGrandPereMaternel())
                .nomGrandPereMaternel(dto.getNomGrandPereMaternel())
                .build();

        return filiation;
    }
}


