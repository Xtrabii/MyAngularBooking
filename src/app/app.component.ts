import { Component, OnInit } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { CommonapiService } from "./commonapi/commonapi.service";
import { JsonPipe } from "@angular/common";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'homes';
  selectedCurrency = 'THB';
  isLoggedIn: boolean = false;
  username: string = 'Name'; // ตัวแปรสำหรับเก็บชื่อผู้ใช้
  public data: any;

  constructor(public common: CommonapiService, private router: Router) {}

  ngOnInit(): void {
    // ตรวจสอบสถานะการล็อกอิน
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      const storedLoginStatus = sessionStorage.getItem('IsLogin');
      if (storedLoginStatus === null) {
        sessionStorage.setItem('IsLogin', JSON.stringify(false));
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = JSON.parse(storedLoginStatus);
      }

      // ดึงชื่อผู้ใช้จาก sessionStorage
      const storedUsername = sessionStorage.getItem('User');
      if (storedUsername) {
        this.username = storedUsername;
      }

      console.log('IsLoggedIn:', this.isLoggedIn);
      console.log('Username:', this.username);
    } else {
      console.warn('sessionStorage is not available in this environment.');
      this.isLoggedIn = false; // ตั้งค่าเริ่มต้นในกรณีไม่มี sessionStorage
    }
  
    this.common.fetchhotel().subscribe((resp) => {
      this.data = resp;
    });
  }

  logout() {
    // ลบข้อมูลการล็อกอิน
    sessionStorage.removeItem('IsLogin');
    sessionStorage.removeItem('User'); 
    this.isLoggedIn = false;
    this.username = 'Name'; // รีเซ็ตชื่อผู้ใช้
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
  }
}
