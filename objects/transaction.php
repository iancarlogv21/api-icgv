<?php
class Transaction { 
    // database connection and table name
    private $conn;
    private $table_name = "tbltransaction"; // FIXED: Added this missing variable
    
    // object properties  
    public $id; // Added this to match your SQL 't.id as Transaction_ID'
    public $Transaction_No;
    public $Customer_No;  
    public $Last_Name;  
    public $First_Name;  
    public $Middle_Name;  
    public $Product_ID;
    public $Product_Name;
    public $Product_Price;
    public $Quantity;
    public $Total_Amount;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // create transaction
    function create(){
        $query = "INSERT INTO " . $this->table_name . "
                SET                     
                Transaction_No=:transNo,            
                Customer_No=:custNo,
                Product_ID=:prodID,           
                Quantity=:qty,
                Total_Amount=:totAmount";

        $stmt = $this->conn->prepare($query);

        $this->Transaction_No=htmlspecialchars(strip_tags($this->Transaction_No)); 
        $this->Customer_No=htmlspecialchars(strip_tags($this->Customer_No));
        $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));  
        $this->Quantity=htmlspecialchars(strip_tags($this->Quantity));
        $this->Total_Amount=htmlspecialchars(strip_tags($this->Total_Amount));

        $stmt->bindParam(":transNo", $this->Transaction_No);
        $stmt->bindParam(":custNo", $this->Customer_No);
        $stmt->bindParam(":prodID", $this->Product_ID);
        $stmt->bindParam(":qty", $this->Quantity);
        $stmt->bindParam(":totAmount", $this->Total_Amount);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // read all transactions
    function readall(){
        $query = "SELECT
                    t.id as Transaction_ID, 
                    t.Transaction_No, 
                    c.Customer_No, 
                    c.Last_Name, 
                    c.First_Name, 
                    c.Middle_Name, 
                    p.name as Product_Name, 
                    p.price as Product_Price, 
                    t.Quantity, 
                    t.Total_Amount
                  FROM " . $this->table_name . " t
                    LEFT JOIN tblcustomer c ON t.Customer_No = c.Customer_No
                    LEFT JOIN products p ON t.Product_ID = p.id
                  ORDER BY t.id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // read transactions with pagination
    public function readPaging($from_record_num, $records_per_page){ 
        $query = "SELECT
                t.id as Transaction_ID, t.Transaction_No, c.Customer_No, c.Last_Name, c.First_Name, c.Middle_Name, 
                p.name as Product_Name, p.price as Product_Price, t.Quantity, t.Total_Amount
                FROM " . $this->table_name . " t
                LEFT JOIN tblcustomer c ON t.Customer_No = c.Customer_No
                LEFT JOIN products p ON t.Product_ID = p.id
                ORDER BY t.id DESC
                LIMIT ?, ?";
     
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total_rows'];
    }

    // Fill update form
    function readOne(){
        $query = "SELECT
                    t.id, t.Transaction_No, c.Customer_No, c.Last_Name, c.First_Name, c.Middle_Name, 
                    t.Product_ID, p.name as Product_Name, p.price as Product_Price, t.Quantity, t.Total_Amount
                  FROM " . $this->table_name . " t
                    LEFT JOIN tblcustomer c ON t.Customer_No = c.Customer_No
                    LEFT JOIN products p ON t.Product_ID = p.id
                  WHERE t.id = ?
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row){
            $this->Transaction_No = $row['Transaction_No'];
            $this->Customer_No = $row['Customer_No'];
            $this->Last_Name = $row['Last_Name'];
            $this->First_Name = $row['First_Name'];
            $this->Middle_Name = $row['Middle_Name'];
            $this->Product_ID = $row['Product_ID'];
            $this->Product_Name = $row['Product_Name'];
            $this->Product_Price = $row['Product_Price'];
            $this->Quantity = $row['Quantity'];
            $this->Total_Amount = $row['Total_Amount'];
            
        }
    }

    function update(){
        $query = "UPDATE " . $this->table_name . "
                  SET 
                    Product_ID = :prodID, 
                    Quantity = :qty, 
                    Total_Amount = :totAmount
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':prodID', $this->Product_ID);
        $stmt->bindParam(':qty', $this->Quantity);
        $stmt->bindParam(':totAmount', $this->Total_Amount);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    // searchPaging method
    public function searchPaging($keywords, $from_record_num, $records_per_page) {
        $query = "SELECT 
                    c.First_Name, c.Last_Name, p.name as Product_Name, 
                    t.id, t.Transaction_No, t.Customer_No, t.Total_Amount, t.Quantity
                  FROM " . $this->table_name . " t
                  LEFT JOIN tblcustomer c ON t.Customer_No = c.Customer_No
                  LEFT JOIN products p ON t.Product_ID = p.id
                  WHERE t.Transaction_No LIKE ? OR c.Last_Name LIKE ? OR p.name LIKE ?
                  ORDER BY t.id DESC 
                  LIMIT ?, ?";

        $stmt = $this->conn->prepare($query);
        $keywords = "%{$keywords}%";
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
        $stmt->bindParam(4, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(5, $records_per_page, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    // countSearch method
    public function countSearch($keywords) {
        $query = "SELECT COUNT(*) as total_rows 
                  FROM " . $this->table_name . " t
                  LEFT JOIN tblcustomer c ON t.Customer_No = c.Customer_No
                  LEFT JOIN products p ON t.Product_ID = p.id
                  WHERE t.Transaction_No LIKE ? OR c.Last_Name LIKE ? OR p.name LIKE ?";

        $stmt = $this->conn->prepare($query);
        $keywords = "%{$keywords}%";
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }


// delete the transaction record
function delete(){
    // delete query
    $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
    return false;
}
}
?>