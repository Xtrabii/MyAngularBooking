import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <div class="container px-6 py-6">
    <section>
    </section>
    <section>
      <br><br>
      <!-- Search Hotel -->
      <div class="input-group rounded col-6">
        <input type="search" class="form-control rounded" placeholder="Search Hotel" #filter>
        <button class="btn btn-dark" (click)="filterResults(filter.value)">Search</button>
      </div>
    </section>
    <section class="results">
      <!-- Display filtered or all housing locations -->
      <app-housing-location 
        *ngFor="let housingLocation of filteredLocationList.length > 0 ? filteredLocationList : housingLocationList" 
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  </div>
  `,
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);

  ngOnInit(): void {
    // ดึงข้อมูลจาก API เมื่อ component ถูกสร้างขึ้น
    this.housingService.loadHousingLocations().subscribe({
      next: (data) => {
        this.housingLocationList = data;
        this.filteredLocationList = data; // เริ่มต้นให้แสดงทั้งหมด
      },
      error: (err) => {
        console.error('Error loading housing locations:', err);
      }
    });
  }

  // ฟังก์ชันกรองข้อมูลตามคำค้นหา
  filterResults(text: string): void {
    if (!text) {
      this.filteredLocationList = this.housingLocationList; // ถ้าไม่มีคำค้นหา แสดงผลทั้งหมด
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(location =>
      location.name.toLowerCase().includes(text.toLowerCase()) // กรองตามชื่อที่ตรงกับคำค้นหา
    );
  }
}
