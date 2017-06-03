/**
 * BASE
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/**
 * PIPES
 */
import { ToStarsPipe } from './pipes/to-stars.pipe';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
/**
 * COMPONENTS
 */
import { AppComponent } from './app.component';
/**
 * SERVICES
 */
import { HotelService } from './services/hotel.service';
import { HomeComponent } from './components/home/home.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    // Pipes
    ToStarsPipe,
    CapitalizeFirstPipe,
    TruncatePipe,
    // Components
    AppComponent,
    HomeComponent,
    HotelComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
