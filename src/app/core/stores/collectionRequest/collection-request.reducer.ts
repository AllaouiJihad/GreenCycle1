import { createFeature, createReducer, on } from '@ngrx/store';
import { CollectionRequestActions } from './collection-request.actions';
import {CollectionRequest} from "../../models/collection-request.model";


export interface CollectionRequestState {
  collectionRequests: CollectionRequest[];
  error: string | null;
}

 const initialState: CollectionRequestState = {
   collectionRequests: [],
   error: null
};

export const collectionRequestsFeature = createFeature({
  name: 'collectionRequestsFeatureKey',
  reducer: createReducer(
    initialState,
    on(CollectionRequestActions.getAllCollectionRequests, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.getAllCollectionRequestsSuccess, (state, action) => ({
      ...state,
      collectionRequests: action.collectionRequests,
    })),
    on(CollectionRequestActions.getAllCollectionRequestsFailure, (state, {error}) => ({
      ...state,
      error
    })),
    on(CollectionRequestActions.addNewCollectionRequest, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.addNewCollectionRequestSuccess, (state, action) => ({
      ...state,
      //collectionRequest: action.collectionRequest,
      collectionRequests: [...state.collectionRequests, action.collectionRequest],
      error: null
    })),
    on(CollectionRequestActions.addNewCollectionRequestFailure, (state, {error}) => ({
      ...state,
      error
    }))
  )
});

export const {name: collectionRequestsFeatureKey, reducer: collectionRequestReducer , selectCollectionRequests} = collectionRequestsFeature;
