import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../layouts/sidebar/sidebar.component";
import {Observable, take} from "rxjs";
import {CollectionRequest} from "../../../core/models/collection-request.model";
import {Store} from "@ngrx/store";
import {CollectionRequestActions} from "../../../core/stores/collectionRequest/collection-request.actions";
import {selectCollectionRequests} from "../../../core/stores/collectionRequest/collection-request.reducer";
import {NavbarComponent} from "../../../layouts/navbar/navbar.component";
import {CommonModule, NgIf} from "@angular/common";
import {AddRequestComponent} from "../add-request/add-request.component";

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    AddRequestComponent,
    NgIf
  ],
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit{
  showModal = false;
  collectionRequests$: Observable<CollectionRequest[]>;
  selectedCollectionRequest: CollectionRequest | null = null;

  constructor(private store: Store) {
    this.collectionRequests$ = this.store.select(selectCollectionRequests);

  }
  ngOnInit() {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }
  closePopup(): void {
    console.log('close modal');
    this.showModal = false;
    this.selectedCollectionRequest = null;
  }

  openPopup() : void{
    console.log('Opening modal');
    this.showModal = true;
  }
  deleteCollectionRequest(collectionRequestId: number) {
    this.store.dispatch(CollectionRequestActions.deleteCollectionRequestById({ collectionRequestId }));
  }
  editCollectionRequest(collectionRequestId: number): void {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
    this.store.select(selectCollectionRequests).pipe(
      take(1)
    ).subscribe(collectionRequests => {
      const collectionRequest = collectionRequests.find(req => req.id === collectionRequestId);
      if (collectionRequest) {
        this.selectedCollectionRequest = collectionRequest;
        this.openPopup();
      }
    });
  }



}
