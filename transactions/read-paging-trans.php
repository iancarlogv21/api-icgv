<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
// utilities
$utilities = new Utilities();
 
// instantiate database and transaction object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$transaction = new Transaction($db);
 
// query transaction
$stmt = $transaction->readPaging($from_record_num, $records_per_page);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // transaction array
    $transaction_arr=array();
    $transaction_arr["records"]=array();
    $transaction_arr["paging"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $transaction_item=array(
            "Transaction_ID" => $Transaction_ID,
            "Transaction_No" => $Transaction_No,
            "Customer_No" => $Customer_No,
            "Last_Name" => $Last_Name,
            "First_Name" => $First_Name,
            "Middle_Name" => $Middle_Name,
            "Product_Name" => $Product_Name,
            "Product_Price" => $Product_Price,
            "Quantity" => $Quantity,
            "Total_Amount" => $Total_Amount
        ); 
        array_push($transaction_arr["records"], $transaction_item);
    }
  
    // include paging
    $total_rows=$transaction->count();
    $page_url="{$home_url}transactions/read-paging-trans.php?";
    $paging=$utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $transaction_arr["paging"]=$paging;
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($transaction_arr);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user transaction does not exist
    echo json_encode(
        array("message" => "No Transactions found.")
    );
}
?>
