<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';
include_once 'objects/user.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"));

// Verify required fields match the JSON keys from JS
if(!empty($data->User_Name) && !empty($data->Password)){
    $user->User_Name = $data->User_Name;
    $user->Password = $data->Password; 

    if($user->userExist()){
        http_response_code(200);
        echo json_encode(array("message" => "Log-In Successful"));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Log-In Failed!"));
    }
} else {
    // If keys are missing or empty
    http_response_code(400);
    echo json_encode(array("message" => "Unable to log-in. Data is incomplete."));
}
?>