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
$id = isset($_GET['hotel_id']) ? (int) $_GET['hotel_id'] : null;

// Check params
if (!$id || $id < 0) // === 0 || === null
  $json->error('Param "hotel_id" must be set and positive integer');

// Create a review object
$review  = new Review();
// Create a review array to send
$reviews = array();

for ($i = 1; $i <= mt_rand(1,5); $i++) {
  array_push($reviews, array(
    'name'     => $review->name(),
    'comment'  => $review->comment(),
    'positive' => $review->positive()
    )
  );
}

// Echo the json object
$json->write($reviews);

?>
