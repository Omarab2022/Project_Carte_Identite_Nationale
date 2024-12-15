// renouvellement.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequestDTO } from 'src/app/Models/request.model';
import { RequestService } from 'src/app/services/request.service';
import { PersonType } from 'src/app/Models/person-type.enum';
import { RequestType } from 'src/app/Models/request-type.enum';
import { RequestStatus } from 'src/app/Models/request-status.enum';
import { PdfServiceService } from 'src/app/services/pdf-service.service';

@Component({
  selector: 'app-renouvellement',
  templateUrl: './renouvellement.component.html',
  styleUrls: ['./renouvellement.component.css']
})
export class RenouvellementComponent implements OnInit {

  RenouvelementForm!: FormGroup;
  personType!: PersonType;
  requestId!: number;

  countries: string[] = ['Maroc', 'France', 'Espagne', 'États-Unis', 'Autres'];
  nationalities: string[] = ['Française', 'Espagnole', 'Américaine', 'Autre'];
  professions: string[] = ['Médecin', 'Ingénieur', 'Enseignant', 'Artisan', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private pdfService: PdfServiceService,
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire avec tous les champs
    this.RenouvelementForm = this.fb.group({
      // ... initialisez tous les champs du formulaire ici
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissanceJj: ['', Validators.required],
      dateNaissanceMm: ['', Validators.required],
      dateNaissanceAaaa: ['', Validators.required],
      sexe: ['', Validators.required],
      paysNaissance: ['', Validators.required],
      provinceNaissance: ['', Validators.required],
      communeNaissance: ['', Validators.required],
      lieuNaissance: [''],
      nationaliteOrigine: ['', Validators.required],
      dateArreteNationaliteJj: [''],
      dateArreteNationaliteMm: [''],
      dateArreteNationaliteAaaa: [''],
      referenceArreteNationalite: [''],
      typeProfession: ['', Validators.required],
      profession: ['', Validators.required],
      etatCivilNumero: ['', Validators.required],
      etatCivilAnnee: ['', Validators.required],
      situationFamille: ['', Validators.required],
      paysResidence: ['', Validators.required],
      provinceResidence: ['', Validators.required],
      communeResidence: [''],
      adresse: ['', Validators.required],
      prenomPere: ['', Validators.required],
      nomPere: [''],
      prenomMere: ['', Validators.required],
      nomMere: [''],
      prenomGrandPerePaternel: ['', Validators.required],
      nomGrandPerePaternel: [''],
      prenomGrandPereMaternel: ['', Validators.required],
      nomGrandPereMaternel: [''],
      email: [''],
      telephone: [''],
      urgenceContact: ['']
    });

    // Récupération de l'ID depuis la route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.requestId = +idParam;
        this.loadRequestData(this.requestId);
      } else {
        Swal.fire('Erreur', 'ID de demande manquant.', 'error');
      }
    });
  }

  private loadRequestData(id: number): void {
    this.requestService.getRequestById(id).subscribe({
      next: (request: RequestDTO | null) => {
        if (request) {
          this.personType = request.personType;
          this.populateForm(request);
          this.adjustFormFields();

          // Forcer la détection de changement pour mettre à jour les options
          this.RenouvelementForm.updateValueAndValidity();
        } else {
          Swal.fire('Erreur', 'Demande non trouvée.', 'error');
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Impossible de charger les données de la demande.', 'error');
      }
    });
  }

  private populateForm(request: RequestDTO): void {
    this.RenouvelementForm.patchValue({
      nom: request.personalInformation.nom,
      prenom: request.personalInformation.prenom,
      dateNaissanceJj: request.personalInformation.dateNaissanceJj,
      dateNaissanceMm: request.personalInformation.dateNaissanceMm,
      dateNaissanceAaaa: request.personalInformation.dateNaissanceAaaa,
      sexe: request.personalInformation.sexe,
      paysNaissance: request.personalInformation.paysNaissance || '',
      provinceNaissance: request.personalInformation.provinceNaissance,
      communeNaissance: request.personalInformation.communeNaissance,
      lieuNaissance: request.personalInformation.lieuNaissance,
      nationaliteOrigine: request.personalInformation.nationaliteOrigine || '',
      dateArreteNationaliteJj: request.personalInformation.dateArreteNationalite
        ? new Date(request.personalInformation.dateArreteNationalite).getDate()
        : '',
      dateArreteNationaliteMm: request.personalInformation.dateArreteNationalite
        ? new Date(request.personalInformation.dateArreteNationalite).getMonth() + 1
        : '',
      dateArreteNationaliteAaaa: request.personalInformation.dateArreteNationalite
        ? new Date(request.personalInformation.dateArreteNationalite).getFullYear()
        : '',
      referenceArreteNationalite: request.personalInformation.referenceArreteNationalite,
      typeProfession: request.personalInformation.typeProfession || '',
      profession: request.personalInformation.profession,
      etatCivilNumero: request.personalInformation.numeroEtatCivil || '',
      etatCivilAnnee: request.personalInformation.anneeEtatCivil || '',
      situationFamille: request.personalInformation.situationFamille || '',
      paysResidence: request.personalInformation.paysResidence || '',
      provinceResidence: request.personalInformation.provinceResidence,
      communeResidence: request.personalInformation.communeResidence || '',
      adresse: request.personalInformation.adresse,
      prenomPere: request.personalInformation.filiation.prenomPere,
      nomPere: request.personalInformation.filiation.nomPere || '',
      prenomMere: request.personalInformation.filiation.prenomMere,
      nomMere: request.personalInformation.filiation.nomMere || '',
      prenomGrandPerePaternel: request.personalInformation.filiation.prenomGrandPerePaternel,
      nomGrandPerePaternel: request.personalInformation.filiation.nomGrandPerePaternel || '',
      prenomGrandPereMaternel: request.personalInformation.filiation.prenomGrandPereMaternel,
      nomGrandPereMaternel: request.personalInformation.filiation.nomGrandPereMaternel || '',
      email: request.email || '',
      telephone: request.telephone || '',
      urgenceContact: request.emergencyContact || ''
    });
  }

  private adjustFormFields(): void {
    if (this.personType === PersonType.MAROCAIN) {
      // Retirer les champs spécifiques aux étrangers
      this.RenouvelementForm.get('dateArreteNationaliteJj')?.clearValidators();
      this.RenouvelementForm.get('dateArreteNationaliteMm')?.clearValidators();
      this.RenouvelementForm.get('dateArreteNationaliteAaaa')?.clearValidators();
      this.RenouvelementForm.get('referenceArreteNationalite')?.clearValidators();
      this.RenouvelementForm.get('communeResidence')?.setValidators([Validators.required]);

      // Masquer les champs dans le template
      // Vous pouvez utiliser une variable comme isMarocain pour le template
    } else if (this.personType === PersonType.ETRANGER) {
      // Retirer les champs spécifiques aux marocains
      this.RenouvelementForm.get('communeResidence')?.clearValidators();
      this.RenouvelementForm.get('dateArreteNationaliteJj')?.setValidators([Validators.required]);
      this.RenouvelementForm.get('dateArreteNationaliteMm')?.setValidators([Validators.required]);
      this.RenouvelementForm.get('dateArreteNationaliteAaaa')?.setValidators([Validators.required]);
      this.RenouvelementForm.get('referenceArreteNationalite')?.setValidators([Validators.required]);

      // Masquer les champs dans le template
    }

    // Mettre à jour la validité du formulaire
    this.RenouvelementForm.get('dateArreteNationaliteJj')?.updateValueAndValidity();
    this.RenouvelementForm.get('dateArreteNationaliteMm')?.updateValueAndValidity();
    this.RenouvelementForm.get('dateArreteNationaliteAaaa')?.updateValueAndValidity();
    this.RenouvelementForm.get('referenceArreteNationalite')?.updateValueAndValidity();
    this.RenouvelementForm.get('communeResidence')?.updateValueAndValidity();
  }


  onSubmit(): void {
    if (this.RenouvelementForm.valid) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment enregistrer ces informations?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si l'utilisateur confirme, générer le PDF et l'imprimer
          this.generateAndPrintPdf();

          // Ensuite, soumettre le formulaire
          this.submitForm();
        } else {
          // Si l'utilisateur annule, rester sur la page
          Swal.fire('Annulé', 'Vous pouvez modifier les informations.', 'info');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement le formulaire.', 'error');
    }
  }

  private generateAndPrintPdf(): void {
    // Utilisez le service PDF pour générer le PDF
    this.pdfService.generatePdf(
      'cnieForm',
      'Renouvellement_CNIE',
      '../../../assets/images/police.png',  // Left logo path
      '../../../assets/images/maroc.png'    // Right logo path
    );
  }

  private submitForm(): void {
    const formValue = this.RenouvelementForm.value;

    // Helper function to pad numbers with leading zeros
    const padNumber = (num: number) => num.toString().padStart(2, '0');

    // Format dateOfBirth with leading zeros and time component
    const dateOfBirth = `${formValue.dateNaissanceAaaa}-${padNumber(formValue.dateNaissanceMm)}-${padNumber(formValue.dateNaissanceJj)}T00:00:00`;

    // Format dateArreteNationalite if applicable, avec le composant temps
    let dateArreteNationalite: string | undefined = undefined;
    if (this.personType === PersonType.ETRANGER) {
      dateArreteNationalite = `${formValue.dateArreteNationaliteAaaa}-${padNumber(formValue.dateArreteNationaliteMm)}-${padNumber(formValue.dateArreteNationaliteJj)}T00:00:00`;
    }

    // Construct the RequestDTO avec les dates correctement formatées
    const requestDTO: RequestDTO = {
      id: this.requestId,
      type: RequestType.RENOUVELLEMENT,
      status: RequestStatus.EN_ATTENTE,
      personType: this.personType,
      numeroPreDemande: '', // Remplir selon votre logique
      cnieNumber: '', // Remplir selon votre logique
      dateOfBirth: dateOfBirth,
      email: formValue.email,
      telephone: formValue.telephone,
      emergencyContact: formValue.urgenceContact,
      personalInformation: {
        nom: formValue.nom,
        prenom: formValue.prenom,
        dateNaissanceJj: formValue.dateNaissanceJj,
        dateNaissanceMm: formValue.dateNaissanceMm,
        dateNaissanceAaaa: formValue.dateNaissanceAaaa,
        sexe: formValue.sexe,
        paysNaissance: formValue.paysNaissance,
        provinceNaissance: formValue.provinceNaissance,
        communeNaissance: formValue.communeNaissance,
        lieuNaissance: formValue.lieuNaissance,
        nationaliteOrigine: formValue.nationaliteOrigine,
        dateArreteNationalite: dateArreteNationalite,
        referenceArreteNationalite: this.personType === PersonType.ETRANGER ? formValue.referenceArreteNationalite : undefined,
        typeProfession: formValue.typeProfession,
        profession: formValue.profession,
        etatCivil: formValue.situationFamille,
        numeroEtatCivil: formValue.etatCivilNumero,
        anneeEtatCivil: formValue.etatCivilAnnee,
        situationFamille: formValue.situationFamille,
        paysResidence: formValue.paysResidence,
        provinceResidence: formValue.provinceResidence,
        communeResidence: this.personType === PersonType.MAROCAIN ? formValue.communeResidence : null,
        adresse: formValue.adresse,
        filiation: {
          prenomPere: formValue.prenomPere,
          nomPere: formValue.nomPere || '',
          prenomMere: formValue.prenomMere,
          nomMere: formValue.nomMere || '',
          prenomGrandPerePaternel: formValue.prenomGrandPerePaternel,
          nomGrandPerePaternel: formValue.nomGrandPerePaternel || '',
          prenomGrandPereMaternel: formValue.prenomGrandPereMaternel,
          nomGrandPereMaternel: formValue.nomGrandPereMaternel || ''
        }
      }
    };

    // Log the requestDTO for debugging
    console.log('Request DTO:', requestDTO);

    this.requestService.updateRequest(this.requestId, requestDTO).subscribe({
      next: (updatedRequest) => {
        Swal.fire('Succès', 'Votre demande a été mise à jour avec succès.', 'success').then(() => {
        });
      },
      error: (err) => {
        console.error('Update Request Error:', err);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
      }
    });
  }

}
