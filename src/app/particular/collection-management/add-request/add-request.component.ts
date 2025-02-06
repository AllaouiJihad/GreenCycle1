import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators, ReactiveFormsModule
} from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "../../../core/models/user.model";
import { selectUsers } from "../../../core/stores/user/user.reducers";
import { UserActions } from "../../../core/stores/user/user.actions";
import { createCollectionRequestValidator } from "../../../core/validators/collection-request";
import { CollectionRequestActions } from "../../../core/stores/collectionRequest/collection-request.actions";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { CollectionRequest, CollectionStatus } from "../../../core/models/collection-request.model";
import { ItemType, RequestItem } from "../../../core/models/request-item.model";

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: CollectionRequest | null = null;

  users$: Observable<User[]>;
  requestForm!: FormGroup;

  collectionStatusArray = Object.values(CollectionStatus);
  itemTypes = Object.values(ItemType);

  constructor(private store: Store, private fb: FormBuilder) {
    this.users$ = this.store.select(selectUsers);
    this.requestForm = createCollectionRequestValidator(this.fb);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());

    if (this.initialRequestData) {
      this.requestForm.patchValue(this.initialRequestData);

      const items = this.initialRequestData.items ?? [];
      items.forEach(item => this.addItem(item));
    }
  }

  onSubmit(): void {
    const formValues = this.requestForm.getRawValue();

    const collectionRequest: CollectionRequest = {
      id: this.initialRequestData?.id,
      user: formValues.user,
      estimatedWeight: formValues.estimatedWeight,
      address: formValues.address,
      city: formValues.city,
      collectionDate: formValues.collectionDate,
      timeSlot: formValues.timeSlot,
      status: formValues.status,
      additionalNotes: formValues.additionalNotes,
      items: formValues.items || []
    };

    if (this.initialRequestData) {
      this.store.dispatch(CollectionRequestActions.updateCollectionRequest({ collectionRequest }));
    } else {
      this.store.dispatch(CollectionRequestActions.addNewCollectionRequest({ collectionRequest }));
    }

    this.requestForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  open(): void {
    this.openPopup.emit();
  }

  cancel(): void {
    this.closePopup.emit();
  }

  get items(): FormArray {
    return this.requestForm.get('items') as FormArray;
  }

  addItem(item?: RequestItem): void {
    const itemFormGroup = this.fb.group({
      wasteType: [item?.wasteType || '', Validators.required],
      weight: [item?.weight || 0, [Validators.required, Validators.min(0)]],
    });
    this.items.push(itemFormGroup);
  }
}
