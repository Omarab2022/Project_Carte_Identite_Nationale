package com.SI.SI.Mappers;


import com.SI.SI.Dtos.RequestDTO;
import com.SI.SI.Entities.Request;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class RequestMapper {

    @Autowired
    private PersonalInformationMapper personalInformationMapper;

    @Autowired
    private SpecialCaseMapper specialCaseMapper;

    public RequestDTO toDto(Request entity) {
        if (entity == null) {
            return null;
        }

        return RequestDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .status(entity.getStatus())
                .personType(entity.getPersonType()) // New field
                .dateCreated(entity.getDateCreated())
                .dateUpdated(entity.getDateUpdated())
                .numeroPreDemande(entity.getNumeroPreDemande())
                .cnieNumber(entity.getCnieNumber())
                .dateOfBirth(entity.getDateOfBirth())
                .email(entity.getEmail())
                .telephone(entity.getTelephone())
                .emergencyContact(entity.getEmergencyContact())
                .objetDemande(entity.getObjetDemande())
                .raisonAssistance(entity.getRaisonAssistance())
                .natureAssistance(entity.getNatureAssistance())
                .nomEtablissement(entity.getNomEtablissement())
                .policeCenterDate(entity.getPoliceCenterDate())
                .personalInformation(entity.getPersonalInformation() != null ?
                        personalInformationMapper.toDto(entity.getPersonalInformation()) : null)
                .specialCase(entity.getSpecialCase() != null ?
                        specialCaseMapper.toDto(entity.getSpecialCase()) : null)
                .build();
    }

    public Request toEntity(RequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Request request = Request.builder()
                .id(dto.getId())
                .type(dto.getType())
                .status(dto.getStatus())
                .personType(dto.getPersonType()) // New field
                .dateCreated(dto.getDateCreated())
                .dateUpdated(dto.getDateUpdated())
                .numeroPreDemande(dto.getNumeroPreDemande())
                .cnieNumber(dto.getCnieNumber())
                .dateOfBirth(dto.getDateOfBirth())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .emergencyContact(dto.getEmergencyContact())
                .objetDemande(dto.getObjetDemande())
                .raisonAssistance(dto.getRaisonAssistance())
                .natureAssistance(dto.getNatureAssistance())
                .nomEtablissement(dto.getNomEtablissement())
                .policeCenterDate(dto.getPoliceCenterDate()) // Mapping the new field
                .personalInformation(dto.getPersonalInformation() != null ?
                        personalInformationMapper.toEntity(dto.getPersonalInformation()) : null)
                .specialCase(dto.getSpecialCase() != null ?
                        specialCaseMapper.toEntity(dto.getSpecialCase()) : null)
                .build();

        if (request.getPersonalInformation() != null) {
            request.getPersonalInformation().setRequest(request);
        }

        if (request.getSpecialCase() != null) {
            request.getSpecialCase().setRequest(request);
        }

        return request;
    }
}


