$(document).ready(function(){
    // Use $(document).on to handle buttons created dynamically by showCategoriesICGV
    $(document).on('click', '.delete-category-button', function(){
        
        // Use $(this).attr('data-id') to get the ID from the button you clicked
        var category_id = $(this).attr('data-id');

        bootbox.confirm({
            message: "<h4>Are you sure you want to delete this category?</h4>",
            buttons: {
                confirm: { label: 'Yes', className: 'btn-danger' },
                cancel: { label: 'No', className: 'btn-default' }
            },
            callback: function (result) {
                if(result == true){
                    $.ajax({
                        url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/delete-rec-cat.php",
                        type : "POST",
                        contentType: 'application/json',
                        // Ensure the key name is "id" (lowercase) to match your PHP
                        data : JSON.stringify({ id: category_id }),
                        success : function(response) {
                            // 1. Remove old alerts
                            $(".alert").remove();
                            
                            // 2. Show success message
                            $("#page-content").prepend("<div class='alert alert-success'>" + response.message + "</div>");
                            
                            // 3. Refresh the table list immediately
                            showCategoriesICGV();
                        },
                        error: function(xhr) {
                            console.log("Delete failed. Response:", xhr.responseText);
                            alert("Error: Could not delete the record.");
                        }
                    });
                }
            }
        });
    });
});