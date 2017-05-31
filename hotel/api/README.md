# Fake hotel api server
Fake hotel api server for demo projects

## Endpoints

### Hotels [`api/hotels`]

#### Params

* `no_error` - prevents server from errors if set, otherwise %20 chance of fail
* `force_error` - enforces server error if set
* `count` - search results count, default: 2, must be <= 8
* `min_stars` - minimum hotel stars, default: 1, must be <= 5
* `max_price` - maximum offer price, default: 500, must be > 1

#### Example
```sh
curl https://rencs.com/demo/hotel/api/hotels
```
```js
[
  {
    "id": "341",              // hotel id
    "name": "Pinnacle Hotel", // hotel name
    "city": "Istanbul",       // hotel city
    "country": "Turkey",      // hotel country
    "price": 250,             // offer price
    "date_start": "2017-06-12T18:55:30.000000Z", //offer start date
    "date_end": "2017-06-25T18:55:30.000000Z",   //offer end date
    "stars": 2,               //hotel stars
    "description": "Phasellus a eros ac consectetur...", //hotel description
    "images": [               // hotel images
      "https://rencs.com/demo/hotel/api/img/04.jpg",
      ...
    ]
  },
  ...
]
```

#### Errors
```sh
curl https://rencs.com/demo/hotel/api/hotels?force_error=1
```
```js
{
  "error": "Something failed!" // error message
}
```

### Reviews [`api/reviews`]

#### Params

* `hotel_id` - hotel id

#### Example
```sh
curl https://rencs.com/demo/hotel/api/reviews?hotel_id=236
```
```js
[
  {
    "name": "Auguste Chandler", //commenter name
    "comment": "Vestibulum in imperdiet sollicitudin imperdiet.", //comment
    "positive": true,           //false if comment is negative
  },
  ...
]
```

#### Errors
```sh
curl https://rencs.com/demo/hotel/api/reviews
```
```js
{
  "error": "hotel_id must be set and positive integer" //error message
}
```

