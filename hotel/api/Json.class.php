<?php

class Json {

  public function __construct() {
    header('Content-type: application/json');
    header("Expires: 0");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
  }

  public function write($arr) {
    echo json_encode($arr);
  }

  public function error($msg) {
    header('HTTP/1.1 500 ' . $msg);
    die(json_encode(array('error' => $msg)));
  }
}

?>
