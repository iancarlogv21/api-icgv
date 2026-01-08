<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/transaction.php';
 
$database = new Database();
$db = $database->getConnection();
 
$transaction = new Transaction($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(    
    !empty($data->Transaction_No) &&
    !empty($data->Customer_No) &&
    !empty($data->Product_ID) &&    
    !empty($data->Quantity) &&    
    !empty($data->Total_Amount)
){
 
    // set product property values   
    $transaction->Transaction_No = $data->Transaction_No;
    $transaction->Customer_No = $data->Customer_No;
    $transaction->Product_ID = $data->Product_ID;    
    $transaction->Quantity = $data->Quantity;
    $transaction->Total_Amount = $data->Total_Amount;
        
    // create the product
    if($transaction->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Transaction was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create Transaction."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create Transaction. Data is incomplete."));
}
?>
