import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suivre-demande',
  templateUrl: './suivre-demande.component.html',
  styleUrls: ['./suivre-demande.component.css']
})
export class SuivreDemandeComponent implements OnInit {
  trackingForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trackingForm = this.formBuilder.group({
      numeroPreDemande: ['', [Validators.required, Validators.pattern(/^PRE\d+$/)]]
    });
  }

  // Getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.trackingForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.trackingForm.invalid) {
      return;
    }

    this.loading = true;
    const numeroPreDemande = this.trackingForm.value.numeroPreDemande;

    this.requestService.getRequestByNumeroPreDemande(numeroPreDemande).subscribe({
      next: (request) => {
        this.loading = false;
        if (request) {
          // Navigate to EtatDemandeComponent with the request ID or data
          this.router.navigate(['/etat-demande', request.numeroPreDemande]);

        } else {
          // Show popup if request not found
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Il n'y a pas de demande avec ce numéro: ${numeroPreDemande}`,
          });
        }
      },
      error: (error) => {
        this.loading = false;
        // Handle error (e.g., network issues)
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue. Veuillez réessayer plus tard.',
        });
        console.error('Error fetching request:', error);
      }
    });
  }
}
