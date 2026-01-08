<?php
class Customer{ 
    // database connection and table name
    private $conn;
    
    // object properties   
    public $Customer_No;
    public $Last_Name;  
    public $First_Name;
    public $Middle_Name;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function readOne(){ 
        // query to read single record
        $query = "SELECT
                *
                FROM
                tblcustomer               
                WHERE
                Customer_No = ?";
               
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind id of product to be updated
        $stmt->bindParam(1, $this->Customer_No);
     
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        // set values to object properties
        $this->Customer_No = $row['Customer_No'];
        $this->Last_Name = $row['Last_Name'];
        $this->First_Name = $row['First_Name'];
        $this->Middle_Name = $row['Middle_Name'];        
        } 
}
?>
