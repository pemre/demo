import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Hotel } from '../models/hotel';
import { Review } from '../models/review';

@Injectable()
export class HotelService {

  apiUrl: string = 'https://rencs.com/demo/hotel/api/'; // API url
  getHotelsUrl: string = 'hotels';                      // API endpoint for hotels
  getReviewsUrl: string = 'reviews';                    // API endpoint for reviews
  hotelCount: string = '5';                             // Number of hotels to retrieve per Ajax call

  constructor(private http: Http) {}

  /**
   * Gets hotel data
   *
   * @returns {Observable<Hotel[]>}
   */
  getHotels(): Observable<Hotel[]> {
    let params = new URLSearchParams();
    params.set('count', this.hotelCount);
    return this.http.get(this.apiUrl + this.getHotelsUrl, { search: params })
      .map(response => response.json() as Hotel[]);
  }

  /**
   * Gets hotel reviews
   *
   * @returns {Observable<Review[]>}
   */
  getReviews(hotelId: string): Observable<Review[]> {
    let params = new URLSearchParams();
    params.set('hotel_id', hotelId);
    return this.http.get(this.apiUrl + this.getReviewsUrl, { search: params })
      .map(response => response.json() as Review[]);
  }

}
