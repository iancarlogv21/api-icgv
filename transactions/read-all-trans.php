<?php
// Required headers for JSON and Cross-Origin access
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and object files
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
// Instantiate database and transaction object
$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

// Query transactions using the readall() method from your object
$stmt = $transaction->readall();
$num = $stmt->rowCount();
 
// Check if records were found
if($num > 0){
 
    $transaction_arr = array();
    $transaction_arr["records"] = array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // This makes $row['Transaction_No'] available as just $Transaction_No
        extract($row);
 
        // These keys MUST match the variables used in your transactions.js template
        $transaction_item = array(
            "Transaction_ID" => $Transaction_ID,
            "Transaction_No" => $Transaction_No,
            "Customer_No" => $Customer_No,
            "Last_Name" => $Last_Name,
            "First_Name" => $First_Name,
            "Middle_Name" => $Middle_Name,
            "Product_Name" => $Product_Name,
            "Product_Price" => $Product_Price,
            "Quantity" => $Quantity,
            "Total_Amount" => $Total_Amount
        ); 
        array_push($transaction_arr["records"], $transaction_item);
    }
 
    http_response_code(200);
    echo json_encode($transaction_arr);
} else {
    // If no records found, tell the user
    http_response_code(404);
    echo json_encode(array("message" => "No Transaction found."));
}
?>