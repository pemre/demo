/**
 * Restaurant Service
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

import fetch from 'isomorphic-fetch'
import '../helpers/handlebars.helpers' // Simple Handlebars helpers for restaurant view
import RestaurantTemplate from '../../templates/restaurant.handlebars' // Handlebars template for a restaurant

export default class RestaurantService {
  /**
   * Returns a Promise to fetch given url
   *
   * @param url
   * @returns {Promise}
   */
  getRestaurants (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(r => r.json())
        .then(data => resolve(data))
        .catch(e => reject(e))
    })
  }

  /**
   * Returns favouriteRestaurants item from localStorage
   *
   * @returns {Array}
   */
  getFavouriteRestaurants () {
    let fav = window.localStorage.getItem('favouriteRestaurants')
    return fav ? JSON.parse(fav) : []
  }

  toggleFavouriteRestaurant (name, callBackFunction) {
    // Get the array of favourite restaurants
    let favourites = this.getFavouriteRestaurants()
    // Add or remove the restaurant
    if (favourites.includes(name)) {
      favourites = favourites.filter(f => f !== name) // Delete if exists
    } else {
      favourites = [...new Set([...favourites, name])] // Add unique restaurant names
    }
    // Write new array
    window.localStorage.setItem('favouriteRestaurants', JSON.stringify(favourites))
    // Call the callBackFunction for re-rendering purpose
    callBackFunction()
  }

  /**
   * Filters restaurants by name, which "starts with" or "contains" filterBy string
   *
   * @param {Object} restaurants
   * @param {String} filterBy
   */
  filterRestaurants (restaurants, filterBy = '') {
    return restaurants
      .filter(restaurant =>
        // Name starts with filterBy string
        restaurant.name.substring(0, filterBy.length).toUpperCase() === filterBy.toUpperCase() ||
        // or contains filterBy string
        restaurant.name.indexOf(filterBy) !== -1
      )
  }

  /**
   * Sorts restaurants by sortingValues property, orders them ASC/DESC
   *
   * @param {Object} restaurants
   * @param {String} sortBy
   * @param {String} sortType
   */
  sortRestaurants (restaurants, sortBy = 'bestMatch', sortType = 'ASC') {
    return (sortBy === 'alphabetical')
      ? restaurants // Sort alphabetically
        .sort((a, b) => {
          return (sortType === 'ASC')
            ? a.name.localeCompare(b.name) // ASC: A > Z
            : b.name.localeCompare(a.name) // DESC: Z > A
        })
      : restaurants // Sort by sortingValues
        .sort((a, b) => {
          return (sortType === 'ASC')
            ? a.sortingValues[sortBy] - b.sortingValues[sortBy] // ASC
            : b.sortingValues[sortBy] - a.sortingValues[sortBy] // DESC
        })
  }

  /**
   * Groups restaurants by property
   *
   * @param {Object} restaurants
   * @param {String} propName
   */
  groupRestaurantsByProp (restaurants, propName = 'status') {
    return restaurants
      .reduce(function (groups, item) {
        let val = item[propName]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
  }

  /**
   * Groups reastaurants into two groups (favourite and regular) based on favourites array
   *
   * @param {Object} restaurants
   * @param {Array} favourites
   */
  groupRestaurantsByFavourites (restaurants, favourites) {
    return restaurants
      .reduce(function (groups, item) {
        // Define two groups
        groups['favourite'] = groups['favourite'] || []
        groups['regular'] = groups['regular'] || []
        // Put the restaurant into a proper group
        favourites.includes(item.name) ? groups['favourite'].push(item) : groups['regular'].push(item)
        return groups
      }, {})
  }

  /**
   * Filters/sorts given restaurants and returns compiled template html
   *
   * @param restaurants
   * @param filter
   * @param sortBy
   * @param sortType
   * @param isFavourite
   * @returns {String}
   */
  composeRestaurantsHtml (restaurants, filter, sortBy, sortType, isFavourite = false) {
    let html // Will contain HTML code of the compiled templates

    // Priority 4: Filter restaurants first
    if (filter !== '') {
      restaurants = this.filterRestaurants(restaurants, filter)
    }

    // Priority 3: Sort restaurants
    restaurants = this.sortRestaurants(restaurants, sortBy, sortType)

    // Priority 2: Group restaurants by status: open, order ahead, closed
    restaurants = this.groupRestaurantsByProp(restaurants, 'status')

    // Show restaurants in order: open, order ahead, closed
    // Use Handlebars to compile all groups
    html = RestaurantTemplate({
      restaurants: restaurants.open,
      favourite: isFavourite,
      sortBy: sortBy
    }) // Open restaurants
    html += RestaurantTemplate({
      restaurants: restaurants['order ahead'],
      favourite: isFavourite,
      sortBy: sortBy
    }) // Order ahead restaurants
    html += RestaurantTemplate({
      restaurants: restaurants.closed,
      favourite: isFavourite,
      sortBy: sortBy
    }) // Closed restaurants

    // Return rendered restaurants in HTML
    return html
  }
}
// We export the RestaurantService class so it can be imported/require()'d in other files.
module.exports = RestaurantService

// TODO: Add comments
