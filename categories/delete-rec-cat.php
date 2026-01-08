<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../config/database.php';
include_once '../objects/category.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare category object
$category = new Category($db);

// get category id from request body
$data = json_decode(file_get_contents("php://input"));

// set category id to be deleted
if(!empty($data->id)){
    $category->id = $data->id;

    // delete the category
    if($category->delete()){
        http_response_code(200);
        echo json_encode(array("message" => "Category was deleted."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete category."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete category. ID is missing."));
}
?>