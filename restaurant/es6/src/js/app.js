/**
 * Restaurant App
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

import RestaurantService from './services/restaurant.service' // Service to get/filter/sort restaurants
import FormTemplate from '../templates/form.handlebars'       // Handlebars template for filter/sort form
import { config } from './config'                             // Config object for the app

const $ = (selector) => { return document.querySelector(selector) } // Short querySelector like jQuery
const $all = (selector) => { return document.querySelectorAll(selector) } // Short querySelectorAll like jQuery

export default class RestaurantApp {
  /**
   * Creates an app instance using the config
   */
  constructor () {
    // Create service instance
    this.r = new RestaurantService()
    // Caching DOM parent elements
    this.$container = $(config.container) // container <div> to list restaurants
    this.$form = $(config.form)           // container <div> for filter/sort form
    // Variables to cache the Handlebars FormTemplate after rendering to DOM
    this.$filterElement = null            // <input.text>
    this.$sortByElement = null            // <select>
    this.$sortTypeElement = null          // <input.checkbox>
    // Variable to cache the restaurants retrieved from the server/json
    this.cachedRestaurants = []
  }

  /**
   * Initializes the app
   */
  init () {
    // Start rendering process by showing the form
    this.renderForm()
    // Fetch restaurants using the service and cache/render them
    this.r.getRestaurants(config.url)
      .then((result) => {
        // Cache the results
        this.cachedRestaurants = result.restaurants
        // List the results
        this.renderRestaurants(null, result.restaurants) // Send 'null' as there is no form change event
      })
      .catch((error) => console.log('FETCH ERROR: ' + error))
  }

  /**
   * Generates form section from FormTemplate,
   * adds eventListeners to form elements
   */
  renderForm () {
    let html // Will contain HTML code of the compiled templates
    // Generate html from the template
    html = FormTemplate()
    // Append generated html to the form
    this.$form.innerHTML = html
    // Form generated, so lets cache the elements inside it
    this.$filterElement = $('#filterElement')   // <input.text>
    this.$sortByElement = $('#sortByElement')   // <select>
    this.$sortTypeElement = $('#sortTypeElement') // <input.checkbox>
    // Bind this to renderRestaurants() before calling it
    //  so that "event" and "this" can live together,
    //  see: https://stackoverflow.com/q/30446622
    this.renderRestaurants = this.renderRestaurants.bind(this)
    // Add event listeners to all form elements for any clicks/changes
    // If happens, re-render the restaurant list
    this.$filterElement.addEventListener('input', this.renderRestaurants)
    this.$sortByElement.addEventListener('change', this.renderRestaurants)
    this.$sortTypeElement.addEventListener('change', this.renderRestaurants)
  }

  /**
   * Renders restaurant list using filter/sort options from the form,
   * adds eventListeners to favourite (heart shaped) buttons.
   * Can handle passed events of EventListeners
   *
   * @param event
   * @param restaurants
   */
  renderRestaurants (event = null, restaurants = this.cachedRestaurants) {
    let html // Will contain HTML code of the compiled templates
    let filter = this.$filterElement.value                                       // <input.text>
    let sortBy = this.$sortByElement.options[this.$sortByElement.selectedIndex].value // <select>
    let sortType = this.$sortTypeElement.checked ? 'DESC' : 'ASC'                  // <input.checkbox>
    let favourites = this.r.getFavouriteRestaurants()

    // Split restaurants into two groups: Favourites and regular ones
    restaurants = this.r.groupRestaurantsByFavourites(restaurants, favourites)

    // Filter (by name), sort (by sortingValues), group (open/ahead/closed)
    // and generate html for each groups. Favourites are listed first
    html = this.r.composeRestaurantsHtml(restaurants.favourite, filter, sortBy, sortType, true) // Also set isFavourite to true
    html += this.r.composeRestaurantsHtml(restaurants.regular, filter, sortBy, sortType)

    if (html) {
      // Append generated html to the container
      this.$container.innerHTML = html
      // Add click handler to all favourite (heart shaped) buttons
      for (let element of $all('.resto__favourite')) {
        element.onclick = (event) => {
          let name = event.target.getAttribute('data-name')
          this.r.toggleFavouriteRestaurant(name, this.renderRestaurants)
        }
      }
    } else {
      // Say 'not found' to users
      this.$container.innerHTML = 'There are no restaurants to show. Would you like to search again?'
    }
  }
}
