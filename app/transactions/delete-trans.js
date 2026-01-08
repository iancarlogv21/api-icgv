$(document).ready(function(){
 
    // Trigger when delete button is clicked
    $(document).off('click', '.delete-transaction-button').on('click', '.delete-transaction-button', function(){
        
        // Get the transaction ID from the button attribute
        var transaction_id = $(this).attr('data-id');
 
        // 1. ASK: "Are you sure?" using Bootbox
        bootbox.confirm({
            message: "<h4>Are you sure you want to delete this transaction?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result == true){
 
                    // 2. DELETE: Send request to PHP
                    $.ajax({
                        url: getUrl() + "transactions/delete-trans.php",
                        type : "POST",
                        dataType : 'json',
                        data : JSON.stringify({ id: transaction_id }),
                        success : function(response) {
 
                            // 3. MESSAGE: Show success alert
                            bootbox.alert("Transaction was successfully deleted.");
 
                            // 4. REFRESH: Reload the consistent table
                            showTransactionFirstPageICGV();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr.responseText);
                            bootbox.alert("Error: Could not delete record.");
                        }
                    });
                }
            }
        });
    });
});