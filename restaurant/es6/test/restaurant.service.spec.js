/* eslint-env mocha */

/**
 * Restaurant Service test spec
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

// Chai - BDD / TDD assertion library
import chai from 'chai'
import chaiHtml from 'chai-html' // Plugin for "html" style assertions

// Handlebars and its helpers
import '../src/js/helpers/handlebars.helpers'

// Service to test
import RestaurantService from '../src/js/services/restaurant.service'
import RestaurantTemplate from '../src/templates/restaurant.handlebars'

// Sample data will be used for testing
import { restaurants, favourites } from './sample/data'

chai.should() // Tell chai that we'll be using the "should" style assertions
chai.use(chaiHtml) // Register the plugin

describe('Restaurant Service', () => {
  describe('filterRestaurants()', () => {
    let r

    beforeEach(() => {
      r = new RestaurantService()
    })

    it('returns one result (starts with test)', () => {
      r.filterRestaurants(restaurants, 'Royal')[0].name.should.equal('Royal Thai')
    })

    it('returns three results (contains test)', () => {
      // (r.filterRestaurants(restaurants, 'am').length).should.equal(3);
      r.filterRestaurants(restaurants, 'am').should.have.lengthOf(3)
    })

    it('returns all results without filterBy param', () => {
      r.filterRestaurants(restaurants).should.have.lengthOf(restaurants.length)
    })
  })

  describe('sortRestaurants()', () => {
    let r

    beforeEach(() => {
      r = new RestaurantService()
    })

    it('returns default first restaurant (bestMatch/ASC)', () => {
      r.sortRestaurants(restaurants)[0].name.should.equal('Tanoshii Sushi')
    })

    it('returns 3rd most popular restaurant (popularity/DESC)', () => {
      r.sortRestaurants(restaurants, 'popularity', 'DESC')[2].name.should.equal('CIRO 1939')
    })

    it('returns last restaurant by name (alphabetical/DESC)', () => {
      r.sortRestaurants(restaurants, 'alphabetical', 'DESC')[0].name.should.equal('Zenzai Sushi')
    })
  })

  describe('groupRestaurantsByProp()', () => {
    let r

    beforeEach(() => {
      r = new RestaurantService()
    })

    it('groups restaurants into 3 groups by status (default)', () => {
      r.groupRestaurantsByProp(restaurants).should.have.all.keys('open', 'order ahead', 'closed')
    })

    it('returns 8 open restaurants', () => {
      r.groupRestaurantsByProp(restaurants).open.should.have.lengthOf(8)
    })

    it('groups restaurants by name and returns one at least', () => {
      r.groupRestaurantsByProp(restaurants, 'name').should.have.any.keys('Pamukkale')
    })
  })

  describe('groupRestaurantsByFavourites()', () => {
    let r

    beforeEach(() => {
      r = new RestaurantService()
    })

    it('groups restaurants into 2 groups (favourite and regular)', () => {
      r.groupRestaurantsByFavourites(restaurants, favourites).should.have.all.keys('favourite', 'regular')
    })

    it('returns 2 favourite restaurants', () => {
      Object.keys(r.groupRestaurantsByFavourites(restaurants, favourites).favourite).should.have.lengthOf(2)
    })
  })

  describe('renderRestaurants()', () => {
    let r,
      html,
      restaurant

    beforeEach(() => {
      r = new RestaurantService()

      restaurant = [{
        'name': 'Lunchpakketdienst',
        'status': 'open',
        'sortingValues': {
          'bestMatch': 306.0,
          'newest': 259.0,
          'ratingAverage': 3.5,
          'distance': 14201,
          'popularity': 0.0,
          'averageProductPrice': 4465,
          'deliveryCosts': 500,
          'minCost': 5000
        }
      }]

      html = RestaurantTemplate({
        restaurants: restaurant,
        favourite: false,
        sortBy: 'bestMatch'
      })
    })

    it('renders html of one restaurant after filtration', () => {
      r.composeRestaurantsHtml(restaurants, 'Lunchpakketdienst', 'bestMatch', 'ASC').should.html.equal(html)
    })
  })
})
