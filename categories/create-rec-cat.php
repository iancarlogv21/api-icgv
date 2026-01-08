<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// FIX: Changed ../../ to ../ to match your folder structure
include_once '../config/database.php';
include_once '../objects/category.php';

// Instantiate database and category object
$database = new Database();
$db = $database->getConnection();

$category = new Category($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(!empty($data->name) && !empty($data->description)){

    // Set category property values
    $category->name = $data->name;
    $category->description = $data->description;

    // Create the category
    if($category->create()){
        http_response_code(201);
        echo json_encode(array("message" => "Category was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create category."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create category. Data is incomplete."));
}
?>