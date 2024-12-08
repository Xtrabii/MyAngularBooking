import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { HotelComponent } from './hotel/hotel.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

const routeConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking-detail', component: BookingDetailComponent },
];

export default routeConfig;
