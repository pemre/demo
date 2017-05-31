<?php

class Hotel {

  private $names = array(
    "pinnacle Hotel",
    "emerald",
    "obelisk",
    "cypher",
    "serene",
    "golden Forest Resort",
    "paradise Hotel & Spa");

  private $locationId = 0;

  private $locations = array(
    "Bangkok,Thailand",
    "London,England",
    "Paris,France",
    "New York,USA",
    "Istanbul,Turkey",
    "Tokyo,Japan",
    "Antalya,Turkey",
    "Barcelona,Spain",
    "Amsterdam,Netherlands",
    "Milan,Italy",
    "Berlin,Germany",
    "Rome,Italy",
    "Osaka,Japan",
    "Vienna,Austria",
    "Prague,Czech Republic");

  private $descriptions = array(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt condimentum mi eget tempor. Sed congue suscipit diam, et luctus tellus volutpat non. Morbi molestie ligula ac arcu laoreet pulvinar.",
    "Praesent accumsan ex id viverra faucibus. Duis ullamcorper sodales dictum. Maecenas pellentesque ultricies dui, id tincidunt massa venenatis porta. Aliquam erat volutpat.",
    "Mauris eleifend vel arcu vel vehicula. Nullam faucibus metus mauris, quis pulvinar tellus sollicitudin eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum in imperdiet ipsum, rutrum viverra nibh. Vestibulum elementum sollicitudin imperdiet.",
    "Nulla tincidunt vel enim suscipit ultricies. Vestibulum in euismod magna, vel fringilla orci. Ut ut nunc nec nisi convallis tristique eget at purus. Fusce tempus mi dignissim luctus rutrum.",
    "Etiam iaculis ex eu dui vestibulum, sit amet porta libero accumsan. Curabitur pharetra, leo ut venenatis ullamcorper, lectus dui luctus ligula, sed commodo dui elit vitae est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean euismod sapien nec nisl egestas sodales.",
    "Phasellus a eros ac urna dapibus tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus dictum neque non arcu condimentum tincidunt. Nulla sed justo vitae orci faucibus dignissim. Nam cursus vestibulum consectetur.",
    "Vestibulum non placerat lectus, nec cursus purus. Donec augue turpis, euismod quis leo sit amet, finibus mollis quam.");

  public function id() {
    return mt_rand(100,999);
  }

  public function name() {
    return $this->names[array_rand($this->names)];
  }

  public function city() {
    $this->locationId = array_rand($this->locations);
    return explode(",", $this->locations[$this->locationId])[0];
  }

  public function country() {
    return explode(",", $this->locations[$this->locationId])[1];
  }

  public function price($max_price) {
    return mt_rand(1, $max_price);
  }

  public function description() {
    return $this->descriptions[array_rand($this->descriptions)];
  }

  public function date_start() {
    return date('Y-m-d\TH:i:s.u\Z', strtotime('+'.mt_rand(0,20).' days'));
  }

  public function date_end() {
    return date('Y-m-d\TH:i:s.u\Z', strtotime('+'.mt_rand(21,40).' days'));
  }

  public function star($min_stars) {
    return mt_rand($min_stars, 5);
  }

  public function images() {
    $imageUrl = "https://rencs.com/demo/hotel/api/img/";
    $images[] = $imageUrl . str_pad(mt_rand(1,20), 2, "0", STR_PAD_LEFT) . ".jpg";
    for ($i = 0; $i <= mt_rand(0,3); $i++) {
      array_push($images, $imageUrl . str_pad(mt_rand(1,20), 2, "0", STR_PAD_LEFT) . ".jpg");
    }
    return $images;
  }
}

?>
