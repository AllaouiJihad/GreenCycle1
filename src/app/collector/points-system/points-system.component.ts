import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { Observable } from "rxjs";
import { CollectionRequest } from "../../core/models/collection-request.model";
import { Store } from "@ngrx/store";
import { selectCollectionRequests } from "../../core/stores/collectionRequest/collection-request.reducer";
import { CollectionRequestActions } from "../../core/stores/collectionRequest/collection-request.actions";
import { AsyncPipe, NgForOf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-points-system',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './points-system.component.html',
  styleUrl: './points-system.component.css'
})
export class PointsSystemComponent implements OnInit {
  collectionRequests$: Observable<(CollectionRequest & { points: number, voucher: number })[]>;

  constructor(private store: Store) {
    this.collectionRequests$ = this.store.select(selectCollectionRequests).pipe(
      map(collections => collections
        .filter(request => request.status === 'OCCUPIED' || request.status === 'VALIDATED')
        .map(request => {
          const points = this.calculatePoints(request.items || []);
          return {
            ...request,
            points,
            voucher: this.calculateVoucher(points)
          };
        })
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }

  private calculatePoints(items: { wasteType: string; weight: number }[]): number {
    const pointRates: { [key: string]: number } = {
      "PLASTIC": 2,
      "GLASS": 1,
      "PAPER": 1,
      "METAL": 5
    };

    return items.reduce((total, item) => {
      return total + (pointRates[item.wasteType] || 0) * item.weight;
    }, 0);
  }

  private calculateVoucher(points: number): number {
    if (points >= 500) {
      return 350;
    } else if (points >= 200) {
      return 120;
    } else if (points >= 100) {
      return 50;
    } else {
      return 0;
    }
  }
}
