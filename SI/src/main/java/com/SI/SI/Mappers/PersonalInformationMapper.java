package com.SI.SI.Mappers;


import com.SI.SI.Dtos.FiliationDTO;
import com.SI.SI.Dtos.PersonalInformationDTO;
import com.SI.SI.Entities.Filiation;
import com.SI.SI.Entities.PersonalInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// PersonalInformationMapper.java (Ensure bidirectional relationships are set)
@Component
public class PersonalInformationMapper {

    @Autowired
    private FiliationMapper filiationMapper;

    public PersonalInformationDTO toDto(PersonalInformation entity) {
        if (entity == null) {
            return null;
        }

        return PersonalInformationDTO.builder()
                .id(entity.getId())
                .nom(entity.getNom())
                .prenom(entity.getPrenom())
                .dateNaissanceJj(entity.getDateNaissanceJj())
                .dateNaissanceMm(entity.getDateNaissanceMm())
                .dateNaissanceAaaa(entity.getDateNaissanceAaaa())
                .sexe(entity.getSexe())
                .paysNaissance(entity.getPaysNaissance())
                .provinceNaissance(entity.getProvinceNaissance())
                .communeNaissance(entity.getCommuneNaissance())
                .lieuNaissance(entity.getLieuNaissance())
                .nationaliteOrigine(entity.getNationaliteOrigine())
                .typeProfession(entity.getTypeProfession())
                .profession(entity.getProfession())
                .etatCivil(entity.getEtatCivil())
                .numeroEtatCivil(entity.getNumeroEtatCivil())
                .anneeEtatCivil(entity.getAnneeEtatCivil())
                .situationFamille(entity.getSituationFamille())
                .paysResidence(entity.getPaysResidence())
                .provinceResidence(entity.getProvinceResidence())
                .communeResidence(entity.getCommuneResidence())
                .adresse(entity.getAdresse())

                // New fields
                .referenceArreteNationalite(entity.getReferenceArreteNationalite())
                .dateArreteNationalite(entity.getDateArreteNationalite())

                .filiation(entity.getFiliation() != null ? filiationMapper.toDto(entity.getFiliation()) : null)
                .build();
    }

    public PersonalInformation toEntity(PersonalInformationDTO dto) {
        if (dto == null) {
            return null;
        }

        PersonalInformation personalInformation = PersonalInformation.builder()
                .id(dto.getId())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .dateNaissanceJj(dto.getDateNaissanceJj())
                .dateNaissanceMm(dto.getDateNaissanceMm())
                .dateNaissanceAaaa(dto.getDateNaissanceAaaa())
                .sexe(dto.getSexe())
                .paysNaissance(dto.getPaysNaissance())
                .provinceNaissance(dto.getProvinceNaissance())
                .communeNaissance(dto.getCommuneNaissance())
                .lieuNaissance(dto.getLieuNaissance())
                .nationaliteOrigine(dto.getNationaliteOrigine())
                .typeProfession(dto.getTypeProfession())
                .profession(dto.getProfession())
                .etatCivil(dto.getEtatCivil())
                .numeroEtatCivil(dto.getNumeroEtatCivil())
                .anneeEtatCivil(dto.getAnneeEtatCivil())
                .situationFamille(dto.getSituationFamille())
                .paysResidence(dto.getPaysResidence())
                .provinceResidence(dto.getProvinceResidence())
                .communeResidence(dto.getCommuneResidence())
                .adresse(dto.getAdresse())

                // New fields
                .referenceArreteNationalite(dto.getReferenceArreteNationalite())
                .dateArreteNationalite(dto.getDateArreteNationalite())

                .filiation(dto.getFiliation() != null ? filiationMapper.toEntity(dto.getFiliation()) : null)
                .build();

        if (personalInformation.getFiliation() != null) {
            personalInformation.getFiliation().setPersonalInformation(personalInformation);
        }

        return personalInformation;
    }
}
