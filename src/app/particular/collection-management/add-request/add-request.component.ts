import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "../../../core/models/user.model";
import { selectUsers } from "../../../core/stores/user/user.reducers";
import { UserActions } from "../../../core/stores/user/user.actions";
import { createCollectionRequestValidator } from "../../../core/validators/collection-request";
import { CollectionRequestActions } from "../../../core/stores/collectionRequest/collection-request.actions";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import { CollectionStatus } from "../../../core/models/collection-request.model";

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();

  users$: Observable<User[]>;
  requestForm!: FormGroup;

  collectionStatusArray = Object.values(CollectionStatus);

  constructor(private store: Store, private fb: FormBuilder) {
    this.users$ = this.store.select(selectUsers);
    this.requestForm = createCollectionRequestValidator(this.fb);
  }

  ngOnInit(): void {
    console.log('ok ca marche');
    this.store.dispatch(UserActions.loadUsers());
  }

  onSubmit(): void {
    const formValues = this.requestForm.getRawValue();
    const collectionRequest = {
      user: formValues.user,
      estimatedWeight: formValues.estimatedWeight,
      address: formValues.address,
      city: formValues.city,
      collectionDate: formValues.collectionDate,
      timeSlot: formValues.timeSlot,
      status: formValues.status,
      additionalNotes: formValues.additionalNotes,
      items: formValues.items,
    };
    this.store.dispatch(CollectionRequestActions.addNewCollectionRequest({ collectionRequest }));
    this.cancel();
  }

  open(): void {
    this.openPopup.emit();
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
