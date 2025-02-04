import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../layouts/sidebar/sidebar.component";
import {Observable} from "rxjs";
import {CollectionRequest} from "../../core/models/collection-request.model";
import {Store} from "@ngrx/store";
import {CollectionRequestActions} from "../../core/stores/collectionRequest/collection-request.actions";
import {selectCollectionRequests} from "../../core/stores/collectionRequest/collection-request.reducer";
import {NavbarComponent} from "../../layouts/navbar/navbar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
  ],
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit{
  collectionRequests$: Observable<CollectionRequest[]>;
  constructor(private store: Store) {
    this.collectionRequests$ = this.store.select(selectCollectionRequests);
  }
  ngOnInit() {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }

}
