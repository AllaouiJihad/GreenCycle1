import {FormBuilder, Validators} from "@angular/forms";
import {CollectionStatus} from "../models/collection-request.model";

export function createCollectionRequestValidator(fb: FormBuilder) {
  return fb.group({
    user: [null, Validators.required],
    estimatedWeight: [null, [Validators.required, Validators.min(1)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    collectionDate: ['', Validators.required],
    timeSlot: ['', Validators.required],
    status: [CollectionStatus.PENDING, Validators.required],
    additionalNotes: [''],
    items: [],
  })
}
