import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const loadUsers = createAction('[USERS] Load Users');
export const loadUsersSuccess = createAction('[USERS] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[USERS] Load Users Failure', props<{ error: string }>());
