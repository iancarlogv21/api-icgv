<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/transaction.php';

$database = new Database();
$db = $database->getConnection();
$transaction = new Transaction($db);

$keywords = isset($_GET["s"]) ? $_GET["s"] : "";

// Use the search method in your object
// Ensure $from_record_num and $records_per_page are defined in core.php
$stmt = $transaction->searchPaging($keywords, $from_record_num, $records_per_page);
$num = $stmt->rowCount();

if($num > 0){
    $transactions_arr = array();
    $transactions_arr["records"] = array();
    $transactions_arr["paging"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $transaction_item = array(
            "Transaction_ID" => $id,
            "Transaction_No" => $Transaction_No,
            "Customer_No" => $Customer_No,
            "First_Name" => $First_Name,
            "Last_Name" => $Last_Name,
            "Product_Name" => $Product_Name,
            "Total_Amount" => $Total_Amount,
            "Quantity" => $Quantity
        );
        array_push($transactions_arr["records"], $transaction_item);
    }

    $total_rows = $transaction->countSearch($keywords);
    $total_pages = ceil($total_rows / $records_per_page);
    
    // Create manual paging array for the JS to read
    $transactions_arr["paging"]["pages"] = array();
    for($x=1; $x<=$total_pages; $x++){
        $transactions_arr["paging"]["pages"][] = array(
            "page" => $x,
            "url" => "{$home_url}transactions/search-rec-trans.php?s={$keywords}&page={$x}",
            "current_page" => ($x==$page) ? "yes" : "no"
        );
    }

    http_response_code(200);
    echo json_encode($transactions_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No transactions found."));
}
?>