import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { SidebarComponent } from "../../layouts/sidebar/sidebar.component";
import { Observable } from "rxjs";
import {CollectionRequest, CollectionStatus} from "../../core/models/collection-request.model";
import { selectCollectionRequests } from "../../core/stores/collectionRequest/collection-request.reducer";
import { CollectionRequestActions } from "../../core/stores/collectionRequest/collection-request.actions";
import { Store } from "@ngrx/store";
import { AsyncPipe, NgClass, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CollectionRequestService } from "../../core/services/collection-request/collection-request.service";

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    AsyncPipe,
    NgForOf,
    NgClass,
    FormsModule
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  collectionRequests$: Observable<CollectionRequest[]>;
  collectionRequests: CollectionRequest[] = [];

  constructor(
    private store: Store,
    private collectionRequestService: CollectionRequestService
  ) {
    this.collectionRequests$ = this.store.select(selectCollectionRequests);
  }

  ngOnInit() {
    this.collectionRequests$.subscribe(requests => {
      this.collectionRequests = requests.map(request => ({
        ...request,
        status: request.status as CollectionStatus // ✅ Convertir en enum
      }));
    });

    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }

  updateStatus(originalRequest: CollectionRequest, newStatus: string) {
    if (!originalRequest.id) {
      console.error("L'ID de la requête de collection est invalide.");
      return;
    }

    // Convertir newStatus en CollectionStatus
    const updatedRequest = { ...originalRequest, status: newStatus as CollectionStatus };

    // Mettre à jour la liste locale
    this.collectionRequests = this.collectionRequests.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    );

    // Envoyer la requête au backend
    if (updatedRequest.id !== undefined) {
      this.collectionRequestService.updateStatus(updatedRequest.id, updatedRequest.status).subscribe({
        next: (response) => {
          console.log('Statut mis à jour:', response);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      });
    } else {
      console.error("L'ID de la requête de collection est invalide.");
    }

  }
}
