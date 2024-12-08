import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Housinglocation } from './housinglocation';
import { BookingDetails } from './booking-detail/booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://127.0.0.1:5000/get_hotel';
  private apibyID = 'http://127.0.0.1:5000/get_hotel_by_id';
  private bookingUrl = 'http://127.0.0.1:5000/get_booking_details';  // Add the correct URL for booking details

  constructor(private http: HttpClient) {}

  // ดึงข้อมูลที่พักทั้งหมดจาก API
  loadHousingLocations(): Observable<Housinglocation[]> {
    return this.http.get<Housinglocation[]>(this.apiUrl);
  }

  // ดึงข้อมูลที่พักโดย ID (ถ้ามี API สนับสนุน)
  getHousingLocationById(id: number): Observable<Housinglocation> {
    return this.http.get<Housinglocation>(`${this.apibyID}/${id}`);
  }

  // แก้ไขให้ใช้ type BookingDetails
  getBookingDetails(): Observable<BookingDetails[]> {
  return this.http.get<BookingDetails[]>('http://localhost:5000/get_booking_details');
}

  
}
