<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';
include_once '../objects/category.php';

$database = new Database();
$db = $database->getConnection();
$category = new Category($db);

$data = json_decode(file_get_contents("php://input"));

// CHECK: Make sure ID, Name, and Description are all present
if(
    !empty($data->id) &&
    !empty($data->name) &&
    !empty($data->description)
){
    // Set category properties
    $category->id = $data->id;
    $category->name = $data->name;
    $category->description = $data->description;

    if($category->update()){
        http_response_code(200);
        echo json_encode(array("message" => "Category was updated."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update category."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update category. Data is incomplete."));
}
?>