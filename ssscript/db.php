<?php
$db = new DB();
echo json_encode($db->dbquery());
$db->close();

class db {
  private $method;
  private $action;
  private $data;
  private $filename = "db.json";
  private $file;
  private $valid_actions = array('diper', 'eat', 'medicine');

  function __construct() {
    $this->action = $_GET['action'];
    $this->method = $_SERVER['REQUEST_METHOD'];
    // read data
    $this->data = $this->loadData();
  }

  public function dbquery() {
    switch ($this->method) {
      case 'POST':
        return $this->saveData();
        break;

      default:
        return $this->getData();
        break;
    }
  }

  private function getData() {
    if(in_array($this->action, $this->valid_actions)) {
      return $this->data->{$this->action};
    }
    return $this->data;
  }

  private function saveData() {
    if(in_array($this->action, $this->valid_actions) && is_numeric((int)$_POST)) {
      $this->data->{$this->action} = $_POST[$this->action];
      $this->writeToFile();
      return "success";
    }
  }

  private function writeToFile() {
    if(empty($this->file)) {
      $this->file = fopen($this->filename,'w');
    }

    file_put_contents($this->filename, json_encode($this->data));
  }

  public function close() {
    if(file_exists($this->filename)) {
      fclose($this->file);
    }
  }

  private function loadData() {
    if(file_exists($this->filename)) {
      $this->file = fopen($this->filename, "rw") or die("Unable to open file!");
      $datastream = fread($this->file, filesize($this->filename));
      return json_decode($datastream);
     } else {
      $time = time();
      $obj = new stdClass;
      $obj->diper = $time;
      $obj->eat = $time;
      $obj->medicine = $time;
      return $obj;
     }
  }
}
