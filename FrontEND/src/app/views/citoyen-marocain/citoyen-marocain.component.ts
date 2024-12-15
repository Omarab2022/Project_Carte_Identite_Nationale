import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonType } from 'src/app/Models/person-type.enum';
import { RequestStatus } from 'src/app/Models/request-status.enum';
import { RequestType } from 'src/app/Models/request-type.enum';
import { RequestDTO } from 'src/app/Models/request.model';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citoyen-marocain',
  templateUrl: './citoyen-marocain.component.html',
  styleUrls: ['./citoyen-marocain.component.css']
})
export class CitoyenMarocainComponent implements OnInit {
  citoyenForm!: FormGroup;

  constructor(private fb: FormBuilder, private requestService: RequestService, private pdfService: PdfServiceService) { }

  ngOnInit(): void {
    this.citoyenForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissanceJj: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      dateNaissanceMm: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      dateNaissanceAaaa: [null, Validators.required],
      sexe: ['', Validators.required],
      paysNaissance: ['', Validators.required],
      provinceNaissance: ['', Validators.required],
      communeNaissance: ['', Validators.required],
      lieuNaissance: [''],
      nationaliteOrigine: ['', Validators.required],
      typeProfession: ['', Validators.required],
      profession: ['', Validators.required],
      etatCivilNumero: ['', Validators.required],
      etatCivilAnnee: [null, Validators.required],
      situationFamille: ['', Validators.required],
      paysResidence: ['', Validators.required],
      provinceResidence: ['', Validators.required],
      communeResidence: ['', Validators.required],
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

  onSubmit() {
    if (this.citoyenForm.invalid) {
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
        // Générer le PDF
        this.generateAndPrintPdf();

        Swal.fire({
          title: 'Envoi en cours...',
          text: 'Veuillez patienter pendant l\'envoi de l\'email',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Soumettre le formulaire
        const formData = this.citoyenForm.value;
        const requestDTO: RequestDTO = this.createRequestDTO(formData);

        this.requestService.createRequest(requestDTO).subscribe({
          next: (response) => this.handleSuccess(),
          error: (error) => this.handleError(error)
        });
      } else {
        Swal.fire('Annulé', 'Vous pouvez modifier les informations.', 'info');
      }
    });
  }

  private generateAndPrintPdf(): void {
    this.pdfService.generatePdf(
      'citoyenForm',
      'Citoyen_Marocain',
      '../../../assets/images/police.png',  // Left logo path
      '../../../assets/images/maroc.png'    // Right logo path
    );
  }

  private createRequestDTO(formData: any): RequestDTO {
    const dateOfBirth = this.formatDate(
      formData.dateNaissanceAaaa,
      formData.dateNaissanceMm,
      formData.dateNaissanceJj
    );

    return {
      id: 0,
      type: RequestType.PREMIERE_DELIVRANCE,
      status: RequestStatus.EN_ATTENTE,
      personType: PersonType.MAROCAIN,
      numeroPreDemande: this.generateNumeroPreDemande(),
      cnieNumber: '',
      dateOfBirth: dateOfBirth,
      email: formData.email,
      telephone: formData.telephone,
      emergencyContact: formData.urgenceContact,
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
        lieuNaissance: formData.lieuNaissance,
        nationaliteOrigine: formData.nationaliteOrigine,
        typeProfession: formData.typeProfession,
        profession: formData.profession,
        etatCivil: formData.situationFamille, // Mapping to match backend enum
        numeroEtatCivil: formData.etatCivilNumero,
        anneeEtatCivil: formData.etatCivilAnnee,
        situationFamille: formData.situationFamille,
        paysResidence: formData.paysResidence,
        provinceResidence: formData.provinceResidence,
        communeResidence: formData.communeResidence,
        adresse: formData.adresse,
        filiation: {
          prenomPere: formData.prenomPere,
          nomPere: formData.nomPere,
          prenomMere: formData.prenomMere,
          nomMere: formData.nomMere,
          prenomGrandPerePaternel: formData.prenomGrandPerePaternel,
          nomGrandPerePaternel: formData.nomGrandPerePaternel,
          prenomGrandPereMaternel: formData.prenomGrandPereMaternel,
          nomGrandPereMaternel: formData.nomGrandPereMaternel
        }
      }
    };
  }

  private formatDate(year: number, month: number, day: number): string {
    return `${year}-${this.padZero(month)}-${this.padZero(day)}T00:00:00`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private generateNumeroPreDemande(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PRE${timestamp}${random}`;
  }

  private showFormErrors() {
    let errorMessage = 'Veuillez corriger les erreurs suivantes:\n';
    Object.keys(this.citoyenForm.controls).forEach(key => {
      const control = this.citoyenForm.get(key);
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
      this.citoyenForm.reset();
      // Add navigation logic here if needed
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