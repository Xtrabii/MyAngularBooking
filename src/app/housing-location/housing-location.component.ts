import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <body>
    <div class="row col align-items-stretch g-4 py-1">

        <div class="col">
          <div class="card shadow-sm">
            <span class="badge text-bg-primary" style="font-size: 15px;">{{ housingLocation.city }}</span>
            <img [src]="housingLocation.photo" class="card-img-top cardimg" alt="{{housingLocation.name}}">
            <div class="card-body">
              <h5><b>{{ housingLocation.name }} </b></h5>
              <p class="card-text"><i class="fa-solid fa-location-dot"></i> {{ housingLocation.place }} , {{ housingLocation.city }}</p>
              <p class="card-text"><b>THB {{ housingLocation.price }} (per night)</b></p>
              <a [routerLink]="['/details', housingLocation.id]" class="btn btn-secondary mt-2">Learn More</a>
            </div>
          </div>
        </div>
    </div>
  </body>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent implements OnInit {
  @Input() housingLocation!: Housinglocation;
  housingLocationList$: Observable<Housinglocation[]>;  // Use Observable to store housing locations
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList$ = this.housingService.loadHousingLocations(); // Use loadHousingLocations method
  }

  ngOnInit(): void {

  }
}
