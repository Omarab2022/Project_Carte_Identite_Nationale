import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-demande',
  templateUrl: './pre-demande.component.html',
  styleUrls: ['./pre-demande.component.css']
})
export class PreDemandeComponent {
  constructor(
    private router: Router,
    private requestService: RequestService
  ) { }

  openCitoyenPopup() {
    Swal.fire({
      title: 'Sélectionnez votre statut',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Citoyen Marocain',
      cancelButtonText: 'Étranger',
      customClass: {
        container: 'custom-swal-container',
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        icon: 'custom-swal-icon',
        actions: 'custom-swal-actions',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/pre-demande/citoyen-marocain']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/pre-demande/etranger']);
      }
    });
  }

  openRenouvellementPopup() {
    Swal.fire({
      title: 'Renouvellement de CNIE',
      input: 'text',
      inputLabel: 'Veuillez entrer votre CIN',
      inputPlaceholder: 'CIN',
      showCancelButton: true,
      confirmButtonText: 'Vérifier',
      cancelButtonText: 'Annuler',
      inputValidator: (value: string) => {
        if (!value) {
          return 'Le CIN est requis!';
        }
        // Optional: Add CIN format validation
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const cin = result.value.trim();
        this.verifyCinAndNavigate(cin);
      }
    });
  }

  private verifyCinAndNavigate(cin: string) {
    this.requestService.getRequestByCIN(cin).subscribe({
      next: (request) => {
        if (request) {
          this.router.navigate(['/renouvellement', request.id]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'CIN non trouvé',
            text: 'Aucune demande trouvée avec ce CIN. Veuillez vérifier ou créer une nouvelle demande.'
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la vérification du CIN:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la vérification du CIN. Veuillez réessayer plus tard.'
        });
      }
    });
  }
}