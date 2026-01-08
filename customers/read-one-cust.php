<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/customer.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$customer = new Customer($db);
 
// set ID property of record to read
$customer->Customer_No = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$customer->readOne();
 
if($customer->Customer_No!=null){
    // create array
    $customer_arr = array(
        "Customer_No" =>  $customer->Customer_No,
        "Last_Name" => $customer->Last_Name,
        "First_Name" => $customer->First_Name,
        "Middle_Name" => $customer->Middle_Name   
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($customer_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user product does not exist
    echo json_encode(array("message" => "Customer does not exist."));
}
?>
