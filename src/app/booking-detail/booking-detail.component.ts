import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { BookingDetails } from './booking-detail.model';// นำเข้าจากไฟล์ที่สร้าง
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-detail',
  imports: [CommonModule, RouterModule, ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnInit {
  bookingDetails$!: Observable<BookingDetails[]>;  // Make sure this is of type Observable<BookingDetails[]>

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    // Request data from the service
    this.bookingDetails$ = this.housingService.getBookingDetails();
    this.bookingDetails$.subscribe(
      (data) => console.log("Booking details received:", data),
      (error) => console.error("Error fetching booking details:", error)
    );
  }
}