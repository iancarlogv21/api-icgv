<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';
include_once '../objects/transaction.php';

$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

// Get the ID from raw input
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)){
    $transaction->id = $data->id;

    if($transaction->delete()){
        http_response_code(200);
        echo json_encode(array("message" => "Transaction was deleted."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete transaction."));
    }
}
?>