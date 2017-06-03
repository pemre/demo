import { Component } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  listHotel: Hotel[] = null;                // List of hotels
  showErrorBox: boolean = false; // Bool value to show the error box
  showLoading: boolean = false;  // Bool value to show the loading spinner

  constructor(private hotelService: HotelService) {}

  /**
   * Gets hotels
   */
  getHotels(): any {
    // Show the loading spinner
    this.showLoading = true;
    // Make the http call
    this.hotelService.getHotels().subscribe((data: Hotel[]) => {
      // Hide the loading spinner
      this.showLoading = false;
      // If array is empty, show error
      if (data.length === 0) {
        this.showError();
      } else {
        // Show the hotels
        this.listHotel = data;
        // Hide the error box
        this.showErrorBox = false;
      }
    }, (err) => {
      // Hide the loading spinner
      this.showLoading = false;
      // Show the error box
      this.showError();
    });
  }

  /**
   * Shows the error box
   */
  showError(): any {
    // Remove the hotels
    this.listHotel = null;
    // Show the error box
    this.showErrorBox = true;
  }
}
