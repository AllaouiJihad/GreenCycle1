import { createFeature, createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";
import { User } from "../../models/user.model";

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false,
      error: null
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    }))
  ),
});

export const {name: usersFeatureKey, reducer: usersReducer, selectUsers,} = userFeature;
