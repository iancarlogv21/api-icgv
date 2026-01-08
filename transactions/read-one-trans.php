<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../objects/transaction.php';

$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

// set ID property of record to read
$transaction->id = isset($_GET['id']) ? $_GET['id'] : die();

// CALL THE METHOD WE JUST ADDED
$transaction->readOne();

if($transaction->Transaction_No != null){
    // create array
    $transaction_arr = array(
        "Transaction_ID" =>  $transaction->id,
        "Transaction_No" => $transaction->Transaction_No,
        "Customer_No" => $transaction->Customer_No,
        "First_Name" => $transaction->First_Name,
        "Last_Name" => $transaction->Last_Name,
        "Product_Name" => $transaction->Product_Name,
        "Quantity" => $transaction->Quantity,
        "Total_Amount" => $transaction->Total_Amount
    );

    http_response_code(200);
    echo json_encode($transaction_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Transaction does not exist."));
}
?>