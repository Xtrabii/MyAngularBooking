import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-detail',
  imports: [CommonModule, RouterModule, ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent {
   bookingDetails$!: Observable<any>;  // ใช้ Observable เพื่อเก็บข้อมูล booking

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    // ดึงข้อมูล booking details จาก API
    this.bookingDetails$ = this.housingService.getBookingDetails();
  }

}
