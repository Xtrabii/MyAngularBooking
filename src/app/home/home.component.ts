import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <div class="container px-6 py-6">
      <section></section>
      <section>
        <br><br>
        <h1 style="color: #235eff;">Welcome to Goodbye World</h1>
        <h4>TAKE THE WORLD WITH YOU</h4>
        <br>
        <!-- Search Hotel -->
        <div class="input-group rounded col-6">
          <input type="search" class="form-control rounded" placeholder="Search Hotel" #filter>
          <button class="btn btn-dark" (click)="filterResults(filter.value)">Search</button>
        </div>
      </section>
      <section class="results">
        <app-housing-location 
          *ngFor="let housingLocation of filteredLocationList.length > 0 ? filteredLocationList : housingLocationList" 
          [housingLocation]="housingLocation">
        </app-housing-location>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);

  ngOnInit(): void {
    this.housingService.loadHousingLocations().subscribe({
      next: (locations) => {
        this.housingLocationList = locations;
        this.filteredLocationList = locations; // เริ่มต้นให้แสดงทุกตัว
      },
      error: (err) => {
        console.error('Error fetching housing locations:', err);
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(location =>
      location.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
