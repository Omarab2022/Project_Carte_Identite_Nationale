import { PersonType } from "./person-type.enum";
import { RequestStatus } from "./request-status.enum";
import { RequestType } from "./request-type.enum";

export interface PersonalInformation {
    nom: string;
    prenom: string;
    dateNaissanceJj: number;
    dateNaissanceMm: number;
    dateNaissanceAaaa: number;
    sexe: string;
    paysNaissance: string;
    provinceNaissance: string;
    communeNaissance: string;
    lieuNaissance?: string;
    nationaliteOrigine: string;
    typeProfession: string;
    profession: string;
    etatCivil: string;
    numeroEtatCivil?: string;
    anneeEtatCivil?: number;
    situationFamille: string;
    paysResidence: string;
    provinceResidence: string;
    communeResidence: string | null; // Change this line
    adresse: string;
    filiation: Filiation;
    referenceArreteNationalite?: string; // Made Optional
    dateArreteNationalite?: string;       // Made Optional
}

// src/app/models/filiation.model.ts
export interface Filiation {
    prenomPere: string;
    nomPere?: string;
    prenomMere: string;
    nomMere?: string;
    prenomGrandPerePaternel: string;
    nomGrandPerePaternel?: string;
    prenomGrandPereMaternel: string;
    nomGrandPereMaternel?: string;
}



export interface RequestDTO {
    id: number;
    type: RequestType;
    status: RequestStatus;
    personType: PersonType;
    dateCreated?: string;
    dateUpdated?: string;
    numeroPreDemande: string;
    cnieNumber: string;
    dateOfBirth: string;
    email?: string;
    telephone?: string;
    emergencyContact?: string;
    objetDemande?: string;
    raisonAssistance?: string;
    natureAssistance?: string;
    nomEtablissement?: string;
    personalInformation: PersonalInformation;
    policeCenterDate?: string | null;
}