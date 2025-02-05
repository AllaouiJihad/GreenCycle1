import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, tap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CollectionRequestActions } from './collection-request.actions';
import {Router} from "@angular/router";
import {CollectionRequestService} from "../../services/collection-request/collection-request.service";


@Injectable()
export class CollectionRequestEffects {
  constructor(private actions$: Actions,
              private collectionRequestService: CollectionRequestService,
              private router: Router) {}
  loadCollectionRequests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionRequestActions.getAllCollectionRequests),
      switchMap(() =>
        this.collectionRequestService.getCollectionRequests().pipe(
          map((collectionRequests) => CollectionRequestActions.getAllCollectionRequestsSuccess({ collectionRequests })),
          catchError(error => of(CollectionRequestActions.getAllCollectionRequestsFailure({ error: error.message }))))
      )

    );
  });
  addNewCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionRequestActions.addNewCollectionRequest),
      switchMap(({ collectionRequest }) =>
        this.collectionRequestService.saveCollectionRequest(collectionRequest).pipe(
          map((response) => CollectionRequestActions.addNewCollectionRequestSuccess({ collectionRequest: response })),
          tap(() => this.router.navigate(['/demande'])),
          catchError(error => of(CollectionRequestActions.addNewCollectionRequestFailure({ error: error.message })))
        )
      )
    );
  }, { dispatch: true });



}
