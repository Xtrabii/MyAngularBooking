import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container px-6 py-6">
      <br><br>
      <!-- รายละเอียด -->
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-6 col-xl-8">
            <h2>{{housingLocation?.name}}</h2>
            <span class="badge rounded-pill text-bg-primary">{{ housingLocation?.type }}</span>
            <p class="card-text">{{housingLocation?.rate}}</p>
            <small class="text-body-secondary">{{housingLocation?.name}}</small>
            <p>
              <i class="fa-solid fa-location-dot"></i> {{housingLocation?.place}}, {{housingLocation?.city}} 
              <a [href]="housingLocation?.map" target="_blank">แผนที่</a>
            </p>
            <h5>Units available: {{housingLocation?.availableUnits}}</h5>
          </div>
          <div class="col-12 col-xl-4 closeright">
            <h5>ราคา/ห้องพัก/คืน เริ่มต้นที่</h5>
            <h4 style="color: #3bb1ff;">{{housingLocation?.price}}</h4>
            <br>
            <a *ngIf="!isLoggedIn"
              [routerLink]="['/login']" 
              class="btn btn-primary" 
              style="--bs-btn-padding-y: 5px; --bs-btn-padding-x: 80px; --bs-btn-font-size: 20px;">
              จองเลย
            </a>
            <a *ngIf="isLoggedIn"
              [routerLink]="['/form', housingLocation?.id]" 
              class="btn btn-primary" 
              style="--bs-btn-padding-y: 5px; --bs-btn-padding-x: 80px; --bs-btn-font-size: 20px;">
              จองเลย
            </a>
            <br><br>
          </div>
          <div class="col-12 col-md-12 col-lg-12 col-xl-12"> 
            <div class="carousel-inner slidecurve">
              <div class="justify-content-center align-items-center">
                <img 
                  [src]="housingLocation?.photo" 
                  class="w-100 modalslideimg" 
                  style="height: 650px;" 
                  alt="...">
              </div>
            </div>
            <br>
          </div>

          <!-- รูปภาพเพิ่มเติม -->
          <div class="col-6 col-md-3 col-lg-3 col-xl-2" *ngFor="let photo of housingLocation?.photos; let i = index">
            <img [src]="photo" class="infoimgcurve mb-2" type="button" data-bs-toggle="modal" [attr.data-bs-target]="'#infoimgModal' + i">
            <div class="modal fade" [id]="'infoimgModal' + i" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Picture</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <img [src]="photo" class="modalinfoimgcurve">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br><br>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    const storedLoginStatus = sessionStorage.getItem('IsLogin');
    if (storedLoginStatus === null) {
      sessionStorage.setItem('IsLogin', JSON.stringify(false));
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = JSON.parse(storedLoginStatus);
    }
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).subscribe({
      next: (location) => {
        this.housingLocation = location;
      },
      error: (err) => {
        console.error('Error loading housing location:', err);
      }
    });
  }
}
