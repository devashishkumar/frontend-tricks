import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { EventsComponent } from './components/events/events.component';
import { BookingsComponent } from './components/bookings/bookings.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'events', component: EventsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: '**', component: HomeComponent },
];
