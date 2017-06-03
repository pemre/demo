import { Component, Input } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel';
import { Review } from '../../models/review';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {

  @Input('hotel') hotel: Hotel;
  hotelNameLimit = 19;                                         // Very long names break the view, so we limit the string
  hotelDescLimit = 160;                                        // Very long descriptions break the view, so we limit the string
  listReview: any;                                             // Review list
  buttonReviewText: string = 'Show reviews';                   // A simple solution for toggling the review button text
  showEmptyReviews: boolean = false;                           // Show a notification box if there are no reviews

  constructor(private hotelService: HotelService) {}

  /**
   * Get hotel reviews
   *
   * @param hotelId
   */
  getReviews(hotelId: string): any {
    // A simple solution for toggling the review button text
    if (this.buttonReviewText === 'Hide reviews') {
      // Hide the reviews
      this.listReview = null;
      // Hide the empty review template
      this.showEmptyReviews = false;
      // Revert the button to its original state
      this.buttonReviewText = 'Show reviews';
      return;
    }

    this.hotelService.getReviews(hotelId).subscribe((data: Review[]) => {

      // If array is empty, show a notification
      if (data.length === 0) {
        // Show the empty review template
        this.showEmptyReviews = true;
      } else {
        // Show the reviews
        this.listReview = data;
        // Hide the empty review template
        this.showEmptyReviews = false;
      }
      // A simple solution for toggling the review button text
      this.buttonReviewText = 'Hide reviews';
    });
  }
}
