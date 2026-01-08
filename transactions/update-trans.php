<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/transaction.php';

$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

// get id of transaction to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of transaction to be edited
$transaction->id = $data->id;

// set property values
$transaction->Product_ID = $data->Product_ID;
$transaction->Quantity = $data->Quantity;
$transaction->Total_Amount = $data->Total_Amount;

// update the transaction
if($transaction->update()){
    http_response_code(200);
    echo json_encode(array("message" => "Transaction was updated."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update transaction."));
}
?>