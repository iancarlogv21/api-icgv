$(document).ready(function(){

    // Triggered when the delete button is clicked
    $(document).on('click', '.delete-product-button', function(){
        
        // Get the product id from the data-id attribute
        var product_id = $(this).attr('data-id');

        // Bootbox confirmation dialog
        bootbox.confirm({
            message: "<h4>Are you sure you want to delete this product?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if(result == true){
 
                    // Send delete request to the PHP API
                    $.ajax({
                        url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/delete-rec-prod.php",
                        type : "POST",
                        dataType : 'json',
                        contentType: 'application/json',
                        data : JSON.stringify({ id: product_id }),
                        success : function(result) {
                            
                            // 1. Notify Successful Deletion
                            $("#page-content").prepend(`
                                <div class='alert alert-success alert-dismissible' role='alert'>
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                    <strong>Success!</strong> Product was successfully deleted.
                                </div>
                            `);

                            // 2. Re-load list of products
                            showProductsICGV();

                            // 3. Optional: Auto-hide the alert after 3 seconds
                            setTimeout(function() {
                                $(".alert-success").fadeOut('slow');
                            }, 3000);
                        },
                        error: function(xhr, resp, text) {
                            console.log("Delete error:", xhr.responseText);
                            
                            // Notify Failure
                            $("#page-content").prepend(`
                                <div class='alert alert-danger alert-dismissible' role='alert'>
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                    <strong>Error!</strong> Unable to delete product.
                                </div>
                            `);
                        }
                    });
                }
            }
        });
    });
});