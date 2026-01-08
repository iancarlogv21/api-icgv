<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/category.php';

// instantiate database and category object
$database = new Database();
$db = $database->getConnection();

// initialize object
$category = new Category($db);

// query categories
// Note: Ensure your method name in category.php is exactly 'readall'
$stmt = $category->readall();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num > 0){
    // categories array
    $category_arr = array();
    $category_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['id'] to $id, $row['name'] to $name, etc.
        extract($row);

        $category_item = array(
            "id" => $id,
            "name" => $name,
            // Added a check to ensure description isn't null before decoding
            "description" => html_entity_decode($description ?? '')
        );

        array_push($category_arr["records"], $category_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show categories data in json format
    echo json_encode($category_arr);
}
else{
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no categories found
    echo json_encode(
        array("message" => "No category found.")
    );
}
?>