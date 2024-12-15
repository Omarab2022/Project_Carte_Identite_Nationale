import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestStatus } from 'src/app/Models/request-status.enum';
import { RequestDTO } from 'src/app/Models/request.model';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etat-demande',
  templateUrl: './etat-demande.component.html',
  styleUrls: ['./etat-demande.component.css']
})
export class EtatDemandeComponent implements OnInit, OnDestroy {
  numeroPreDemande!: string;
  request!: RequestDTO;
  loading = true;
  error = '';
  private pollingSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const numeroPreDemandeParam = params.get('numeroPreDemande');
      if (numeroPreDemandeParam) {
        this.numeroPreDemande = numeroPreDemandeParam;
        this.fetchRequestDetails();
        this.startPolling();
      } else {
        this.error = 'Numéro de pré-demande invalide.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  fetchRequestDetails(): void {
    this.requestService.getRequestByNumeroPreDemande(this.numeroPreDemande).subscribe({
      next: (request: RequestDTO | null) => {
        if (request) {
          this.request = request;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Demande non trouvée',
            text: 'Aucune demande trouvée pour ce numéro de pré-demande.'
          });
          this.error = 'Demande non trouvée.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la demande:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la récupération des détails de la demande.'
        });
        this.error = 'Erreur lors de la récupération des détails.';
        this.loading = false;
      }
    });
  }

  startPolling(): void {
    this.pollingSubscription = interval(30000).pipe(
      switchMap(() => this.requestService.getRequestByNumeroPreDemande(this.numeroPreDemande))
    ).subscribe({
      next: (request: RequestDTO | null) => {
        if (request) {
          this.request = request;
        }
      },
      error: (err) => console.error('Erreur lors du polling:', err)
    });
  }

  getStatusClass(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.EN_ATTENTE:
        return 'pending';
      case RequestStatus.APPRUVEE:
        return 'success';
      case RequestStatus.REJETEE:
        return 'rejected';
      case RequestStatus.COMPLETEE:
        return 'completed';
      case RequestStatus.ANNULEE:
        return 'cancelled';
      case RequestStatus.ALLER_CENTRE_POLICE:
        return 'police-center';
      default:
        console.warn(`Statut non géré: ${status}`);
        return 'unknown';
    }
  }
}
