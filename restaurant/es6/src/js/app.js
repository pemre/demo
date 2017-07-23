/**
 * Restaurant App
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */
import RestaurantService from './services/restaurant.service' // Service to get/filter/sort restaurants
import FormTemplate from '../templates/form.handlebars'       // Handlebars template for filter/sort form

const url  = './sample.json', // Url of the API or JSON file
      r    = new RestaurantService(),
      $    = (selector) => { return document.querySelector(selector) },    // Shortcut for querySelector like jQuery
      $all = (selector) => { return document.querySelectorAll(selector) }; // Shortcut for querySelectorAll like jQuery

    // Caching DOM parent elements
let $container = $('#container'), // container <div> to list restaurants
    $form      = $('#form'),      // container <div> for filter/sort form
    // Variables to cache after rendering FormTemplate to DOM
    $filterElement,   // <input.text>
    $sortByElement,   // <select>
    $sortTypeElement, // <input.checkbox>
    // Variable to cache the restaurants retrieved from server
    cachedRestaurants = [];


/**
 * Generates form section from FormTemplate,
 * adds eventListeners to form elements
 */
let listForm = () => {
    let html; // Will contain HTML code of the compiled templates
    // Generate html from the template
    html = FormTemplate();
    // Append generated html to the form
    $form.innerHTML = html;
    // Form generated, so lets cache the elements inside it
    $filterElement   = $('#filterElement');   // <input.text>
    $sortByElement   = $('#sortByElement');   // <select>
    $sortTypeElement = $('#sortTypeElement'); // <input.checkbox>
    // Add event listeners to all form elements for any clicks/changes
    // If happens, re-render the restaurant list
    $filterElement.addEventListener('input', listRestaurants);
    $sortByElement.addEventListener('change', listRestaurants);
    $sortTypeElement.addEventListener('change', listRestaurants);
};

/**
 * Renders restaurant list using filter/sort options from the form,
 * adds eventListeners to favourite (heart shaped) buttons.
 * Can handle passed events of EventListeners
 *
 * @param event
 * @param restaurants
 */
let listRestaurants = (event = null, restaurants = cachedRestaurants) => {
    let html, // Will contain HTML code of the compiled templates
        filter      = $filterElement.value,                                       // <input.text>
        sortBy      = $sortByElement.options[$sortByElement.selectedIndex].value, // <select>
        sortType    = $sortTypeElement.checked ? 'ASC' : 'DESC',                  // <input.checkbox>
        favourites  = r.getFavouriteRestaurants();

    // Split restaurants into two groups: Favourites and regular ones
    restaurants = r.groupRestaurantsByFavourites(restaurants, favourites);

    // Filter (by name), sort (by sortingValues), group (open/ahead/closed)
    // and generate html for each groups. Favourites are listed first
    html =  r.renderRestaurants(restaurants.favourite, filter, sortBy, sortType, true); // Also set isFavourite to true
    html += r.renderRestaurants(restaurants.regular, filter, sortBy, sortType);

    if (html) {
        // Append generated html to the container
        $container.innerHTML = html;
        // Add click handler to all favourite (heart shaped) buttons
        for (let element of $all('.resto__favourite'))
            element.onclick = (event) => {
                let name = event.target.getAttribute('data-name');
                r.toggleFavouriteRestaurant(name, listRestaurants);
            };
    } else {
        // Say 'not found' to users
        $container.innerHTML = "There are no restaurants to show. Would you like to search again?";
    }
};

// Start rendering process by showing the form
listForm();
// Fetch restaurants and render them too
r.getRestaurants(url)
    .then((result) => {
        // Cache the results
        cachedRestaurants = result.restaurants;
        // List the results
        listRestaurants(null, result.restaurants); // Send 'null' as there is no form change event
    })
    .catch((error) => {
        // Oops, show the error
        console.log('FETCH ERROR: ' + error)
    });