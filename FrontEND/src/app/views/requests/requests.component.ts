// src/app/components/requests/requests.component.ts

import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import Swal from 'sweetalert2';
import { RequestDTO } from 'src/app/Models/request.model';
import { RequestStatus } from 'src/app/Models/request-status.enum';
import { RequestStatusUpdateDTO } from 'src/app/Models/request-status-update.dto';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: RequestDTO[] = [];
  marocainCount: number = 0;
  etrangerCount: number = 0;

  // Enum pour l'accès dans le template
  RequestStatus = RequestStatus;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.marocainCount = data.filter(r => r.personType === 'MAROCAIN').length;
        this.etrangerCount = data.filter(r => r.personType === 'ETRANGER').length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des demandes', err);
        Swal.fire('Erreur', 'Impossible de récupérer les demandes.', 'error');
      }
    });
  }

  onStatusChange(request: RequestDTO, newStatus: RequestStatus): void {
    if (newStatus === RequestStatus.ALLER_CENTRE_POLICE) {
      Swal.fire({
        title: 'Choisir la date',
        input: 'date',
        inputLabel: 'Date pour aller au centre de police',
        inputPlaceholder: 'Choisir une date',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Vous devez choisir une date!';
          }
          const selected = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selected < today) {
            return 'La date doit être aujourd\'hui ou dans le futur!';
          }
          return null;
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const selectedDate = result.value;

          // Show loading popup
          Swal.fire({
            title: 'Mise à jour en cours',
            html: 'Envoi de l\'e-mail de notification en cours...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const statusUpdate: RequestStatusUpdateDTO = {
            status: newStatus,
            policeCenterDate: selectedDate
          };

          this.requestService.updateRequestStatus(request.id, statusUpdate).subscribe({
            next: (updatedRequest) => {
              const index = this.requests.findIndex(r => r.id === updatedRequest.id);
              if (index !== -1) {
                this.requests[index].status = updatedRequest.status;
                this.requests[index].policeCenterDate = updatedRequest.policeCenterDate;
              }

              // Success popup
              Swal.fire(
                'Succès',
                'Statut mis à jour avec la date sélectionnée et notification envoyée au citoyen.',
                'success'
              );
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour du statut', err);

              // Error popup
              Swal.fire(
                'Erreur',
                'Impossible de mettre à jour le statut. Vérifiez votre connexion internet et réessayez.',
                'error'
              );
            }
          });
        }
      });
    } else {
      // Show loading popup
      Swal.fire({
        title: 'Mise à jour en cours',
        html: 'Envoi de l\'e-mail de notification en cours...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const statusUpdate: RequestStatusUpdateDTO = {
        status: newStatus
      };

      this.requestService.updateRequestStatus(request.id, statusUpdate).subscribe({
        next: (updatedRequest) => {
          const index = this.requests.findIndex(r => r.id === updatedRequest.id);
          if (index !== -1) {
            this.requests[index].status = updatedRequest.status;
            this.requests[index].policeCenterDate = updatedRequest.policeCenterDate;
          }

          // Success popup
          Swal.fire(
            'Succès',
            'Statut mis à jour et notification envoyée au citoyen.',
            'success'
          );
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut', err);

          // Error popup
          Swal.fire(
            'Erreur',
            'Impossible de mettre à jour le statut. Vérifiez votre connexion internet et réessayez.',
            'error'
          );
        }
      });
    }
  }

  viewRequest(request: RequestDTO): void {
    // Construire le contenu HTML pour le modal
    const content = `
      <div style="text-align: left;">
        <h3>Détails de la Demande</h3>
        <p><strong>Nom:</strong> ${request.personalInformation.nom}</p>
        <p><strong>Prénom:</strong> ${request.personalInformation.prenom}</p>
        <p><strong>Type:</strong> ${request.type}</p>
        <p><strong>Status:</strong> ${request.status}</p>
        <p><strong>Person Type:</strong> ${request.personType}</p>
        <p><strong>Number:</strong> ${request.numeroPreDemande}</p>
        <h4>Informations Personnelles</h4>
        <p><strong>Date de Naissance:</strong> ${request.personalInformation.dateNaissanceJj}/${request.personalInformation.dateNaissanceMm}/${request.personalInformation.dateNaissanceAaaa}</p>
        <p><strong>Sexe:</strong> ${request.personalInformation.sexe}</p>
        <p><strong>Pays de Naissance:</strong> ${request.personalInformation.paysNaissance}</p>
        <p><strong>Province de Naissance:</strong> ${request.personalInformation.provinceNaissance}</p>
        <p><strong>Commune de Naissance:</strong> ${request.personalInformation.communeNaissance}</p>
        <p><strong>Nationalité Origine:</strong> ${request.personalInformation.nationaliteOrigine}</p>
        <p><strong>Profession:</strong> ${request.personalInformation.profession}</p>
        <p><strong>État Civil:</strong> ${request.personalInformation.etatCivil}</p>
        <p><strong>Adresse:</strong> ${request.personalInformation.adresse}</p>
        ${request.policeCenterDate ? `<p><strong>Date Centre de Police:</strong> ${new Date(request.policeCenterDate).toLocaleDateString()}</p>` : ''}
        ${request.objetDemande ? `<p><strong>Objet de la Demande:</strong> ${request.objetDemande}</p>` : ''}
        ${request.raisonAssistance ? `<p><strong>Raison de l'Assistance:</strong> ${request.raisonAssistance}</p>` : ''}
      </div>
    `;

    // Afficher le modal avec SweetAlert2
    Swal.fire({
      title: 'Détails de la Demande',
      html: content,
      width: '600px',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Fermer',
      customClass: {
        popup: 'swal2-overflow', // Pour gérer le débordement si nécessaire
      },
    });
  }

}
