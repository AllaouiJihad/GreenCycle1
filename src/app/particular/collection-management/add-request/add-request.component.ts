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
    // Récupère la liste des utilisateurs
    this.users$ = this.store.select(selectUsers);
    // Initialise le formulaire via la fonction createCollectionRequestValidator
    this.requestForm = createCollectionRequestValidator(this.fb);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());

    // Si on édite une requête existante (initialRequestData non nul)
    if (this.initialRequestData) {
      // On met à jour les champs simples
      this.requestForm.patchValue(this.initialRequestData);

      // On récupère le tableau d'items s'il existe
      const items = this.initialRequestData.items ?? [];
      items.forEach(item => this.addItem(item));
    }
  }

  // Méthode appelée à la soumission du formulaire
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
      // Mise à jour d'une requête existante
      this.store.dispatch(CollectionRequestActions.updateCollectionRequest({ collectionRequest }));
    } else {
      // Création d'une nouvelle requête
      this.store.dispatch(CollectionRequestActions.addNewCollectionRequest({ collectionRequest }));
    }

    // On réinitialise le formulaire
    this.requestForm.reset();
    // Fermeture du popup
    this.cancel();
    // On remet initialRequestData à null
    this.initialRequestData = null;
  }

  // Ouvre la pop-up (si vous gérez son ouverture depuis ce composant)
  open(): void {
    this.openPopup.emit();
  }

  // Ferme la pop-up
  cancel(): void {
    this.closePopup.emit();
  }

  // Getter pour accéder au FormArray "items"
  get items(): FormArray {
    return this.requestForm.get('items') as FormArray;
  }

  // Ajoute un item dans le FormArray
  addItem(item?: RequestItem): void {
    const itemFormGroup = this.fb.group({
      wasteType: [item?.wasteType || '', Validators.required],
      weight: [item?.weight || 0, [Validators.required, Validators.min(0)]],
    });
    this.items.push(itemFormGroup);
  }
}
