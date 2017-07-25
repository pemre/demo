/**
 * Restaurant Service test spec
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

// Chai - BDD / TDD assertion library
import chai from 'chai';          // Import chai
import chaiHtml from 'chai-html'; // Import chai-html plugin for "html" style assertions
chai.should();                    // Tell chai that we'll be using the "should" style assertions
chai.use(chaiHtml);               // Register the plugin

// Handlebars and its helpers
import Handlebars from 'handlebars';
import Registrar from 'handlebars-registrar';
Registrar(Handlebars, { helpers: '../../src/js/helpers/*.js' });

// Service to test
import RestaurantService from '../../src/js/services/restaurant.service';   // Import the restaurant service
import RestaurantTemplate from '../../src/templates/restaurant.handlebars'; // Handlebars template for a restaurant

// Using sample data for testing
let restaurants = [
    {
        "name": "Tanoshii Sushi",
        "status": "open",
        "sortingValues": {
            "bestMatch": 0.0,
            "newest": 96.0,
            "ratingAverage": 4.5,
            "distance": 1190,
            "popularity": 17.0,
            "averageProductPrice": 1536,
            "deliveryCosts": 200,
            "minCost": 1000
        }
    },
    {
        "name": "Tandoori Express",
        "status": "closed",
        "sortingValues": {
            "bestMatch": 1.0,
            "newest": 266.0,
            "ratingAverage": 4.5,
            "distance": 2308,
            "popularity": 123.0,
            "averageProductPrice": 1146,
            "deliveryCosts": 150,
            "minCost": 1300
        }
    }, {
        "name": "Royal Thai",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 2.0,
            "newest": 133.0,
            "ratingAverage": 4.5,
            "distance": 2639,
            "popularity": 44.0,
            "averageProductPrice": 1492,
            "deliveryCosts": 150,
            "minCost": 2500
        }
    }, {
        "name": "Sushi One",
        "status": "open",
        "sortingValues": {
            "bestMatch": 3.0,
            "newest": 238.0,
            "ratingAverage": 4.0,
            "distance": 1618,
            "popularity": 23.0,
            "averageProductPrice": 1285,
            "deliveryCosts": 0,
            "minCost": 1200
        }
    }, {
        "name": "Roti Shop",
        "status": "open",
        "sortingValues": {
            "bestMatch": 4.0,
            "newest": 247.0,
            "ratingAverage": 4.5,
            "distance": 2308,
            "popularity": 81.0,
            "averageProductPrice": 915,
            "deliveryCosts": 0,
            "minCost": 2000
        }
    }, {
        "name": "Aarti 2",
        "status": "open",
        "sortingValues": {
            "bestMatch": 5.0,
            "newest": 153.0,
            "ratingAverage": 4.5,
            "distance": 1605,
            "popularity": 44.0,
            "averageProductPrice": 922,
            "deliveryCosts": 250,
            "minCost": 500
        }
    }, {
        "name": "Pizza Heart",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 6.0,
            "newest": 118.0,
            "ratingAverage": 4.0,
            "distance": 2453,
            "popularity": 9.0,
            "averageProductPrice": 1103,
            "deliveryCosts": 150,
            "minCost": 1500
        }
    }, {
        "name": "Mama Mia",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 7.0,
            "newest": 250.0,
            "ratingAverage": 4.0,
            "distance": 1396,
            "popularity": 6.0,
            "averageProductPrice": 912,
            "deliveryCosts": 0,
            "minCost": 1000
        }
    }, {
        "name": "Feelfood",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 8.0,
            "newest": 163.0,
            "ratingAverage": 4.5,
            "distance": 2732,
            "popularity": 31.0,
            "averageProductPrice": 902,
            "deliveryCosts": 150,
            "minCost": 1500
        }
    }, {
        "name": "Daily Sushi",
        "status": "closed",
        "sortingValues": {
            "bestMatch": 9.0,
            "newest": 221.0,
            "ratingAverage": 4.0,
            "distance": 1911,
            "popularity": 6.0,
            "averageProductPrice": 1327,
            "deliveryCosts": 200,
            "minCost": 1000
        }
    }, {
        "name": "Pamukkale",
        "status": "closed",
        "sortingValues": {
            "bestMatch": 10.0,
            "newest": 201.0,
            "ratingAverage": 4.0,
            "distance": 2353,
            "popularity": 25.0,
            "averageProductPrice": 968,
            "deliveryCosts": 0,
            "minCost": 2000
        }
    }, {
        "name": "Indian Kitchen",
        "status": "open",
        "sortingValues": {
            "bestMatch": 11.0,
            "newest": 272.0,
            "ratingAverage": 4.5,
            "distance": 2308,
            "popularity": 5.0,
            "averageProductPrice": 1189,
            "deliveryCosts": 150,
            "minCost": 1300
        }
    }, {
        "name": "CIRO 1939",
        "status": "open",
        "sortingValues": {
            "bestMatch": 12.0,
            "newest": 231.0,
            "ratingAverage": 4.5,
            "distance": 3957,
            "popularity": 79.0,
            "averageProductPrice": 1762,
            "deliveryCosts": 99,
            "minCost": 1300
        }
    }, {
        "name": "Zenzai Sushi",
        "status": "closed",
        "sortingValues": {
            "bestMatch": 13.0,
            "newest": 155.0,
            "ratingAverage": 4.0,
            "distance": 2911,
            "popularity": 36.0,
            "averageProductPrice": 1579,
            "deliveryCosts": 0,
            "minCost": 2000
        }
    }, {
        "name": "Fes Patisserie",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 14.0,
            "newest": 77.0,
            "ratingAverage": 4.0,
            "distance": 2302,
            "popularity": 3.0,
            "averageProductPrice": 1214,
            "deliveryCosts": 150,
            "minCost": 1250
        }
    }, {
        "name": "Yvonne's Vispaleis",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 15.0,
            "newest": 150.0,
            "ratingAverage": 5.0,
            "distance": 2909,
            "popularity": 3.0,
            "averageProductPrice": 2557,
            "deliveryCosts": 150,
            "minCost": 1750
        }
    }, {
        "name": "De Amsterdamsche Tram",
        "status": "open",
        "sortingValues": {
            "bestMatch": 304.0,
            "newest": 131.0,
            "ratingAverage": 0.0,
            "distance": 2792,
            "popularity": 0.0,
            "averageProductPrice": 892,
            "deliveryCosts": 0,
            "minCost": 0
        }
    }, {
        "name": "Lale Restaurant & Snackbar",
        "status": "order ahead",
        "sortingValues": {
            "bestMatch": 305.0,
            "newest": 73.0,
            "ratingAverage": 0.0,
            "distance": 2880,
            "popularity": 0.0,
            "averageProductPrice": 838,
            "deliveryCosts": 0,
            "minCost": 0
        }
    }, {
        "name": "Lunchpakketdienst",
        "status": "open",
        "sortingValues": {
            "bestMatch": 306.0,
            "newest": 259.0,
            "ratingAverage": 3.5,
            "distance": 14201,
            "popularity": 0.0,
            "averageProductPrice": 4465,
            "deliveryCosts": 500,
            "minCost": 5000
        }
    }], // sample.json
    favourites = ['Pamukkale', 'Royal Thai']; // randomly selected favourite restaurants


describe('Restaurant Service', () => {

    describe('filterRestaurants()', () => {
        let r;

        beforeEach(() => {
            r = new RestaurantService();
        });

        it('returns one result (starts with test)', () => {
            r.filterRestaurants(restaurants, 'Royal')[0].name.should.equal('Royal Thai');
        });

        it('returns three results (contains test)', () => {
           // (r.filterRestaurants(restaurants, 'am').length).should.equal(3);
            r.filterRestaurants(restaurants, 'am').should.have.lengthOf(3);
        });

        it('returns all results without filterBy param', () => {
            r.filterRestaurants(restaurants).should.have.lengthOf(restaurants.length);
        });
    });

    describe('sortRestaurants()', () => {
        let r;

        beforeEach(() => {
            r = new RestaurantService();
        });

        it('returns default first restaurant (bestMatch/ASC)', () => {
            r.sortRestaurants(restaurants)[0].name.should.equal('Tanoshii Sushi');
        });

        it('returns 3rd most popular restaurant (popularity/DESC)', () => {
            r.sortRestaurants(restaurants, 'popularity', 'DESC')[2].name.should.equal('CIRO 1939');
        });

        it('returns last restaurant by name (alphabetical/DESC)', () => {
            r.sortRestaurants(restaurants, 'alphabetical', 'DESC')[0].name.should.equal('Zenzai Sushi');
        });
    });

    describe('groupRestaurantsByProp()', () => {
        let r;

        beforeEach(() => {
            r = new RestaurantService();
        });

        it('groups restaurants into 3 groups by status (default)', () => {
            r.groupRestaurantsByProp(restaurants).should.have.all.keys('open', 'order ahead', 'closed');
        });

        it('returns 8 open restaurants', () => {
            r.groupRestaurantsByProp(restaurants).open.should.have.lengthOf(8);
        });

        it('groups restaurants by name and returns one at least', () => {
            r.groupRestaurantsByProp(restaurants, 'name').should.have.any.keys('Pamukkale');
        });
    });

    describe('groupRestaurantsByFavourites()', () => {
        let r;

        beforeEach(() => {
            r = new RestaurantService();
        });

        it('groups restaurants into 2 groups (favourite and regular)', () => {
            r.groupRestaurantsByFavourites(restaurants, favourites).should.have.all.keys('favourite', 'regular');
        });

        it('returns 2 favourite restaurants', () => {
            Object.keys(r.groupRestaurantsByFavourites(restaurants, favourites).favourite).should.have.lengthOf(2);
        });
    });

    describe('renderRestaurants()', () => {
        let r,
            html,
            restaurant;

        beforeEach(() => {
            r = new RestaurantService();

            restaurant = [{
                "name": "Lunchpakketdienst",
                "status": "open",
                "sortingValues": {
                    "bestMatch": 306.0,
                    "newest": 259.0,
                    "ratingAverage": 3.5,
                    "distance": 14201,
                    "popularity": 0.0,
                    "averageProductPrice": 4465,
                    "deliveryCosts": 500,
                    "minCost": 5000
                }
            }];

            html = RestaurantTemplate({
                restaurants: restaurant,
                favourite: false,
                sortBy: 'bestMatch'
            });
        });

        it('renders html of one restaurant after filtration', () => {
            r.renderRestaurants(restaurants, 'Lunchpakketdienst', 'bestMatch', 'ASC').should.html.equal(html);
        });
    });
});
