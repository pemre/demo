<?php
// Error reporting
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// Register called classes automatically
spl_autoload_register(function ($class_name) {
    include $class_name . '.class.php';
});

// Create a json object
$json = new Json();

// Get params
$no_error   = isset($_GET['no_error'])    ? (bool) $_GET['no_error'] : false;
$forceError = isset($_GET['force_error']) ? (bool) $_GET['force_error'] : false;
$count      = isset($_GET['count'])       ? (int) $_GET['count'] : 2;
$min_stars  = isset($_GET['min_stars'])   ? (int) $_GET['min_stars'] : 1;
$max_price  = isset($_GET['max_price'])   ? (int) $_GET['max_price'] : 500;

// Check params
if (!$no_error && ($forceError || mt_rand(1,5) == 1)) // Die by %20 chance
  $json->error('Something failed!');
if ($count > 8)
  $json->error('Param "count" must be <= 8');
if ($min_stars > 5)
  $json->error('Param "min_stars" must be <= 5');
if ($max_price < 1)
  $json->error('Param "max_price" must be > 1');

// Create a hotel object
$hotel  = new Hotel();
// Create a hotel array to send
$hotels = array();

for ($i = 1; $i <= $count; $i++) {
  array_push($hotels, array(
    'id'          => $hotel->id(),
    'name'        => $hotel->name(),
    'city'        => $hotel->city(),
    'country'     => $hotel->country(),
    'price'       => $hotel->price($max_price),
    'date_start'  => $hotel->date_start(),
    'date_end'    => $hotel->date_end(),
    'stars'       => $hotel->star($min_stars),
    'description' => $hotel->description(),
    'images'      => $hotel->images()
    )
  );
}

// Echo the json object
$json->write($hotels);

?>
