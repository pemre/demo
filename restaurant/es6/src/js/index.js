/**
 * Restaurant App Initializer
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

import 'babel-polyfill'           // Polyfill for old browsers
import RestaurantApp from './app' // App to run

// Creating a new instance
let app = new RestaurantApp()
// Initialize the app
app.init()
