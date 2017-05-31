<?php

class Review {

  private $firstNames = array(
    "Monica",
    "Chandler",
    "Joey",
    "Rachel",
    "Ross",
    "Dorota",
    "Cade",
    "Les",
    "Auguste",
    "Brent",
    "Carolyne",
    "Caryn",
    "Tony",
    "Dave",
    "Charleen",
    "Taren",
    "Marcelino",
    "Wanda",
    "Damion");

  private $lastNames = array(
    "Geller",
    "Buffay",
    "Green",
    "Bing",
    "Tribbiani",
    "Ellisson",
    "Way",
    "Jeanes",
    "Mcwilliam",
    "James",
    "Katzer",
    "Steveson",
    "Jasper",
    "Olvera",
    "Fitzgerald",
    "Pittmon",
    "Iniguez");

  private $comments = array(
    "Consectetur adipiscing elit. Mauris tincidunt condimentum mi eget tempor. Sed congue suscipit diam.",
    "Duis ullamcorper sodales dictum. Maecenas pellentesque ultricies dui.",
    "Id tincidunt massa venenatis porta. Aliquam erat volutpat.",
    "Quis pulvinar tellus sollicitudin eget. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    "Vestibulum in imperdiet ipsum, rutrum viverra nibh. Vestibulum elementum sollicitudin imperdiet.",
    "Eleifend vel arcu vel vehicula. Nullam faucibus metus mauris.",
    "Vel fringilla orci. Ut ut nunc nec nisi convallis tristique eget at purus.",
    "Fusce tempus mi dignissim luctus rutrum.",
    "Sit amet porta libero accumsan. Curabitur pharetra, leo ut venenatis ullamcorper.",
    "Aenean euismod sapien nec nisl egestas sodales.",
    "Sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    "Donec augue turpis, euismod quis leo sit amet, finibus mollis quam.");
  
  public function name() {
    return $this->firstNames[array_rand($this->firstNames)]
           . " "
           . $this->lastNames[array_rand($this->lastNames)];
  }

  public function comment() {
    return $this->comments[array_rand($this->comments)];
  }

  public function positive() {
    return (bool) mt_rand(0,1);
  }
}

?>
