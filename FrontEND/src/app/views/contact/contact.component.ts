import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  icon?: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit {
  faqs: FaqItem[] = [
    {
      question: 'À partir de quel âge un citoyen est-il obligé de disposer d\'une CNIE ?',
      answer: 'Tout marocain âgé de 16 ans révolus est obligé de disposer de la Carte Nationale d\'Identité Électronique (CNIE).',
      isOpen: false,
      icon: 'calendar'
    },
    {
      question: 'Est-ce que la CNIE peut être délivrée aux mineurs ?',
      answer: 'Oui, la CNIE peut être délivrée aux mineurs à partir de 16 ans. Les parents ou tuteurs légaux peuvent assister le mineur dans sa demande.',
      isOpen: false,
      icon: 'id-card'
    },
    {
      question: 'Le citoyen est-t-il censé changer de Carte Nationale une fois la nouvelle Carte lancée ?',
      answer: 'Oui, les citoyens sont encouragés à remplacer leur ancienne carte par la nouvelle Carte Nationale d\'Identité Électronique (CNIE) qui offre plus de fonctionnalités et de sécurité.',
      isOpen: false,
      icon: 'refresh'
    },
    {
      question: 'Quelles sont les exigences de la photo qui sera utilisée pour l\'établissement de la CNIE ?',
      answer: 'La photo doit respecter les critères suivants : \n- Récente (moins de 6 mois)\n- Fond blanc ou clair\n- Visage de face, sans lunettes\n- Taille du visage entre 70-80% de la photo\n- Format numérique de haute qualité',
      isOpen: false,
      icon: 'camera'
    },
    {
      question: 'Où trouver les pièces justificatives nécessaires ?',
      answer: 'Les pièces justificatives peuvent être obtenues auprès des :\n- Bureaux communaux\n- Centres administratifs locaux\n- Portail officiel CNIE.MA\n- Mairies de votre région',
      isOpen: false,
      icon: 'file'
    },
    {
      question: 'Comment doit-on procéder en cas de perte du code PIN ?',
      answer: 'En cas de perte du code PIN :\n1. Visitez un centre d\'enregistrement local\n2. Présentez votre pièce d\'identité\n3. Demandez la réinitialisation de votre code PIN\n4. Un nouveau code vous sera fourni après vérification',
      isOpen: false,
      icon: 'lock'
    },
    {
      question: 'Quelle est la durée de validité de la carte nationale d\'identité électronique ?',
      answer: 'La Carte Nationale d\'Identité Électronique (CNIE) est valable pour une durée de 10 ans pour les personnes âgées de plus de 18 ans, et de 5 ans pour les mineurs.',
      isOpen: false,
      icon: 'clock'
    },
    {
      question: 'Comment s\'effectue la modification ou la suppression des données additionnelles ?',
      answer: 'Les modifications des données additionnelles peuvent être effectuées :\n- En ligne via le portail CNIE.MA\n- Dans un centre d\'enregistrement local\n- Avec les documents justificatifs nécessaires',
      isOpen: false,
      icon: 'edit'
    },
    {
      question: 'Quelles sont les services proposés par le Portail de la Carte Nationale d\'Identité Électronique ?',
      answer: 'Le portail CNIE.MA propose plusieurs services :\n- Suivi de demande de carte\n- Prise de rendez-vous\n- Vérification des informations personnelles\n- Demande de duplicata\n- Consultation des services administratifs',
      isOpen: false,
      icon: 'globe'
    },
    {
      question: 'Quelles sont les étapes à suivre pour faire une demande d\'obtention de la nouvelle CNIE ?',
      answer: 'Étapes pour obtenir la CNIE :\n1. Rassembler les documents requis\n2. Prendre rendez-vous en ligne ou au guichet\n3. Se présenter au centre avec les documents originaux\n4. Capture biométrique\n5. Paiement des frais\n6. Réception de la carte',
      isOpen: false,
      icon: 'list'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleFaq(index: number): void {
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.isOpen = false;
      }
    });

    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

}
