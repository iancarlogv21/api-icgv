<?php
class Database{
 // specify your own database credentials
 private $host = "127.0.0.1"; //or localhost for pc/laptop
 private $db_name = "api_db_icgv";
 private $username = "root";
 private $password = ""; //for mobile developers use root as password
 public $conn;
 // get the database connection
public function getConnection(){
    $this->conn = null;
    try{
        $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good for debugging
        $this->conn->exec("set names utf8");
    }catch(PDOException $exception){
        // We log the error or handle it silently so it doesn't break the JSON structure
        error_log("Connection error: " . $exception->getMessage());
    }
    return $this->conn;
}
 }
