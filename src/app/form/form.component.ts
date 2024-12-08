import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;
  hotel_name: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Form Data
  firstName: string = '';
  lastName: string = '';
  phone : string = '';
  checkinDate: string = '';
  stayDuration: number = 1;
  checkoutDate: string = '';
  paymentMethod: string = '';
  totalPrice: number = 0;
  vat: number = 0;
  grandTotal: number = 0;

  // View Control
  showInfoForm = true;
  showCheckoutForm = false;

  ngOnInit(): void {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    
    this.housingService.getHousingLocationById(housingLocationId).subscribe({
      next: (location) => {
        this.housingLocation = location; 
        this.hotel_name = this.housingLocation.name;
      },
      error: (err) => {
        console.error('Error loading housing location:', err);
      }
    });
  }
  calculateCheckoutDate(): void {
    if (this.checkinDate && this.stayDuration) {
      const checkin = new Date(this.checkinDate);
      checkin.setDate(checkin.getDate() + this.stayDuration);
      this.checkoutDate = checkin.toISOString().split('T')[0];
    }
  }

  // ไปที่หน้าชำระเงิน
  goToCheckout(): void {
    if (this.housingLocation) {
      this.totalPrice = this.stayDuration * this.housingLocation.price;
      this.vat = this.totalPrice * 0.07;
      this.grandTotal = this.totalPrice + this.vat;

      this.showInfoForm = false;
      this.showCheckoutForm = true;
    }
  }

  // ย้อนกลับไปที่ฟอร์มข้อมูล
  goBackToInfoForm(): void {
    this.showCheckoutForm = false;
    this.showInfoForm = true;
  }

  // ชำระเงิน
  pay(): void {
    if (!this.firstName || !this.lastName || !this.phone) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนชำระเงิน');
      return;
    }
  
    if (!this.paymentMethod) {
      alert('กรุณาเลือกช่องทางการชำระเงินก่อนชำระเงิน');
      return;
    }
  
    const bookingData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      username : sessionStorage.getItem('User'),
      hotel_name : this.hotel_name,
      checkinDate: this.checkinDate,
      stayDuration: this.stayDuration,
      checkoutDate: this.checkoutDate,
      paymentMethod: this.paymentMethod,
      totalPrice: this.totalPrice,
      vat: this.vat,
      grandTotal: this.grandTotal,
    };
  
    alert(`Payment successful! Grand Total: ${this.grandTotal} THB.`);
    console.log(bookingData);
  
    this.http.post('http://127.0.0.1:5000/booking', bookingData).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
      },
      error: (error) => {
        console.error('Error during booking:', error);
      },
    });
  
    this.resetForm();
  }

  // Reset Form
  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.checkinDate = '';
    this.stayDuration = 1;
    this.checkoutDate = '';
    this.paymentMethod = '';
    this.totalPrice = 0;
    this.vat = 0;
    this.grandTotal = 0;

    this.showInfoForm = true;
    this.showCheckoutForm = false;
  }
}
