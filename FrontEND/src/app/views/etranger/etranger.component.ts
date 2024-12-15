// src/app/components/etranger/etranger.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import Swal from 'sweetalert2';
import { RequestType } from 'src/app/Models/request-type.enum';
import { RequestStatus } from 'src/app/Models/request-status.enum';
import { PersonType } from 'src/app/Models/person-type.enum';
import { RequestDTO } from 'src/app/Models/request.model';
import { PdfServiceService } from 'src/app/services/pdf-service.service';

@Component({
  selector: 'app-etranger',
  templateUrl: './etranger.component.html',
  styleUrls: ['./etranger.component.css']
})
export class EtrangerComponent implements OnInit {
  etrangerForm!: FormGroup;
  countries: string[] = ['Maroc', 'France', 'Espagne', 'États-Unis', 'Autres'];
  nationalities: string[] = ['Française', 'Espagnole', 'Américaine', 'Autre'];
  professions: string[] = ['Médecin', 'Ingénieur', 'Enseignant', 'Artisan', 'Autre'];

  constructor(private fb: FormBuilder, private requestService: RequestService, private pdfService: PdfServiceService) { }

  ngOnInit(): void {
    this.etrangerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      paysNaissance: ['', Validators.required],
      provinceNaissance: ['', Validators.required],
      communeNaissance: ['', Validators.required],
      lieuNaissance: [''],
      nationaliteOrigine: ['', Validators.required],
      typeProfession: ['', Validators.required],
      profession: ['', Validators.required],
      // Additional Fields for ETRANGER
      dateNaissanceJj: [null, [...this.createDateValidators(), Validators.max(31)]],
      dateNaissanceMm: [null, [...this.createDateValidators(), Validators.max(12)]],
      dateNaissanceAaaa: [null, [...this.createDateValidators(), Validators.min(1900)]],
      dateArretNationaliteJj: [null, [...this.createDateValidators(), Validators.max(31)]],
      dateArretNationaliteMm: [null, [...this.createDateValidators(), Validators.max(12)]],
      dateArretNationaliteAaaa: [null, [...this.createDateValidators(), Validators.min(1900)]],
      referenceArreteNationalite: ['', Validators.required], // **Added Field**
      etatCivilNumero: ['', Validators.required],
      etatCivilAnnee: [null, Validators.required],
      situationFamille: ['', Validators.required],
      paysResidence: ['', Validators.required],
      provinceResidence: ['', Validators.required],
      adresse: ['', Validators.required],
      prenomPere: ['', Validators.required],
      nomPere: [''],
      prenomMere: ['', Validators.required],
      nomMere: [''],
      prenomGrandPerePaternel: ['', Validators.required],
      nomGrandPerePaternel: [''],
      prenomGrandPereMaternel: ['', Validators.required],
      nomGrandPereMaternel: [''],
      email: ['', [Validators.email]],
      telephone: [''],
      urgenceContact: ['']
    });
  }

  private createDateValidators() {
    return [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$')
    ];
  }

  onSubmit() {
    if (this.etrangerForm.invalid) {
      this.showFormErrors();
      return;
    }

    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment enregistrer ces informations?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generateAndPrintPdf();
        const formData = this.etrangerForm.value;
        const requestDTO: RequestDTO = this.createRequestDTO(formData);
        this.requestService.createRequest(requestDTO).subscribe({
          next: (response) => this.handleSuccess(),
          error: (error) => {
            console.error('Full error object:', error);
            this.handleError(error);
          }
        });
      } else {
        Swal.fire('Annulé', 'Vous pouvez modifier les informations.', 'info');
      }
    });
  }

  private generateAndPrintPdf(): void {
    this.pdfService.generatePdf(
      'etrangerForm',
      'Etranger_Premiere_Delivrance',
      '../../../assets/images/police.png',
      '../../../assets/images/maroc.png'
    );
  }


  private createRequestDTO(formData: any): RequestDTO {
    if (!this.isValidDate(
      formData.dateNaissanceAaaa,
      formData.dateNaissanceMm,
      formData.dateNaissanceJj
    )) {
      throw new Error('Date de naissance invalide');
    }

    if (!this.isValidDate(
      formData.dateArretNationaliteAaaa,
      formData.dateArretNationaliteMm,
      formData.dateArretNationaliteJj
    )) {
      throw new Error('Date d\'arrêt de nationalité invalide');
    }

    const dateOfBirth = this.formatDate(
      formData.dateNaissanceAaaa,
      formData.dateNaissanceMm,
      formData.dateNaissanceJj
    );

    const dateArretNationalite = this.formatDate(
      formData.dateArretNationaliteAaaa,
      formData.dateArretNationaliteMm,
      formData.dateArretNationaliteJj
    );

    return {
      id: 0,
      type: RequestType.PREMIERE_DELIVRANCE,
      status: RequestStatus.EN_ATTENTE,
      personType: PersonType.ETRANGER,
      numeroPreDemande: this.generateNumeroPreDemande(),
      cnieNumber: '',
      dateOfBirth: dateOfBirth,
      email: formData.email || '',
      telephone: formData.telephone || '',
      emergencyContact: formData.urgenceContact || '',
      personalInformation: {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissanceJj: formData.dateNaissanceJj,
        dateNaissanceMm: formData.dateNaissanceMm,
        dateNaissanceAaaa: formData.dateNaissanceAaaa,
        sexe: formData.sexe,
        paysNaissance: formData.paysNaissance,
        provinceNaissance: formData.provinceNaissance,
        communeNaissance: formData.communeNaissance,
        lieuNaissance: formData.lieuNaissance || '',
        nationaliteOrigine: formData.nationaliteOrigine,
        typeProfession: formData.typeProfession,
        profession: formData.profession,
        etatCivil: formData.situationFamille,
        numeroEtatCivil: formData.etatCivilNumero,
        anneeEtatCivil: formData.etatCivilAnnee,
        situationFamille: formData.situationFamille,
        paysResidence: formData.paysResidence,
        provinceResidence: formData.provinceResidence,
        communeResidence: null, // Set to null for non-Moroccan users
        adresse: formData.adresse,
        filiation: {
          prenomPere: formData.prenomPere,
          nomPere: formData.nomPere || '',
          prenomMere: formData.prenomMere,
          nomMere: formData.nomMere || '',
          prenomGrandPerePaternel: formData.prenomGrandPerePaternel,
          nomGrandPerePaternel: formData.nomGrandPerePaternel || '',
          prenomGrandPereMaternel: formData.prenomGrandPereMaternel,
          nomGrandPereMaternel: formData.nomGrandPereMaternel || ''
        },
        referenceArreteNationalite: formData.referenceArreteNationalite, // **Added Field**
        dateArreteNationalite: this.formatDate(
          formData.dateArretNationaliteAaaa,
          formData.dateArretNationaliteMm,
          formData.dateArretNationaliteJj
        ) // **Added Field**
      },
      objetDemande: 'Première Délivrance',
      policeCenterDate: null
    };
  }

  private formatDate(year: number, month: number, day: number): string {
    return `${year}-${this.padZero(month)}-${this.padZero(day)}T00:00:00`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private isValidDate(year: number, month: number, day: number): boolean {
    if (!year || !month || !day) return false;

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;
  }

  private generateNumeroPreDemande(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PRE${timestamp}${random}`;
  }

  private showFormErrors() {
    let errorMessage = 'Veuillez corriger les erreurs suivantes:\n';
    Object.keys(this.etrangerForm.controls).forEach(key => {
      const control = this.etrangerForm.get(key);
      if (control?.errors) {
        errorMessage += `- ${this.getFieldName(key)}\n`;
      }
    });

    Swal.fire({
      icon: 'error',
      title: 'Formulaire invalide',
      text: errorMessage
    });
  }

  private getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      nom: 'Nom',
      prenom: 'Prénom',
      dateNaissanceJj: 'Jour de naissance',
      dateNaissanceMm: 'Mois de naissance',
      dateNaissanceAaaa: 'Année de naissance',
      sexe: 'Sexe',
      paysNaissance: 'Pays de naissance',
      provinceNaissance: 'Province ou ville de naissance',
      communeNaissance: 'Commune de naissance',
      nationaliteOrigine: 'Nationalité d\'origine',
      typeProfession: 'Type de profession',
      profession: 'Profession',
      dateArretNationaliteJj: 'Jour d\'arrêt de nationalité',
      dateArretNationaliteMm: 'Mois d\'arrêt de nationalité',
      dateArretNationaliteAaaa: 'Année d\'arrêt de nationalité',
      referenceArreteNationalite: 'Référence de l\'arrêté de nationalité',
      etatCivilNumero: 'Numéro d\'état civil',
      etatCivilAnnee: 'Année d\'état civil',
      situationFamille: 'Situation de famille',
      paysResidence: 'Pays de résidence',
      provinceResidence: 'Province ou ville de résidence',
      communeResidence: 'Commune de résidence',
      adresse: 'Adresse',
      prenomPere: 'Prénom du père',
      prenomMere: 'Prénom de la mère',
      prenomGrandPerePaternel: 'Prénom du grand père paternel',
      prenomGrandPereMaternel: 'Prénom du grand père maternel'
      // Add more field names as needed
    };
    return fieldNames[key] || key;
  }

  private handleSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Votre demande a été enregistrée avec succès.'
    }).then(() => {
      this.etrangerForm.reset();
      // Optionally, navigate to another page
    });
  }

  private handleError(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: `Une erreur est survenue lors de l'enregistrement: ${error.error?.message || error.message || 'Erreur inconnue'}`
    });
  }
}