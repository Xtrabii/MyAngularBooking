import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // ใช้ providedIn เพื่อให้ Service สามารถใช้ได้ทั่วแอป
})
export class ApiService {
  private apiUrl = 'http://localhost/angular-backend/api.php';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
