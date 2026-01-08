$(document).ready(function(){
 
    $(document).on('click', '.update-product-button', function(){
        
        // Get the ID from the button attribute
        var idICGV = $(this).attr('data-id');
        
        // URL to read one record
        var read_one_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/read-one-prod.php?id=" + idICGV;

        // 1. Get the specific product data first
        $.getJSON(read_one_url, function(dataICGV){
            
            // 2. Now load categories to build the dropdown
            // Ensure this URL is correct based on your folder structure
            var category_api_url_ICGV = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/read-all-cat.php";

            $.getJSON(category_api_url_ICGV, function(catDataICGV){
                
                // Build the Category Dropdown using the category names
                var categories_options_html = `<select name='category_id' class='form-control' required>`;
                
                $.each(catDataICGV.records, function(key, val){
                    // Auto-select the current category of the product
                    if(val.id == dataICGV.category_id) {
                        categories_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`;
                    } else {
                        categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
                    }
                });
                categories_options_html += `</select>`;

                var update_html = `
                    <div id='read-products' class='btn btn-primary pull-right m-b-15px read-product-button'>
                        <span class='glyphicon glyphicon-list'></span> Read Products
                    </div>

                    <form id='update-product-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table-bordered'>
                            <input type='hidden' name='id' value='` + idICGV + `' />

                            <tr>
                                <td class='w-25-pct'>Name</td>
                                <td class='w-75-pct'><input type='text' name='name' value='` + dataICGV.name + `' class='form-control' required /></td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><input type='number' min='1' step='0.01' name='price' value='` + dataICGV.price + `' class='form-control' required /></td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td><textarea name='description' class='form-control' required>` + dataICGV.description + `</textarea></td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>` + categories_options_html + `</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type='submit' class='btn btn-info'>
                                        <span class='glyphicon glyphicon-edit'></span> Update Product
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>`;

                // Inject to page content
                $("#page-content").html(update_html);
                
                // Change page title using the function defined in app.js
                changePageTitleICGV("Update Product");
            });
            
        }).fail(function() {
            alert("Error: Unable to retrieve product data for ID: " + idICGV);
        });
    });

    // Handle the Update Form Submission
    $(document).on('submit', '#update-product-form', function(){
        
        // Convert form data to JSON format using your serializeObjectICGV function
        var form_dataICGV = JSON.stringify($(this).serializeObjectICGV());
        
        $.ajax({
            url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/update-rec-prod.php",
            type : "POST",
            contentType : 'application/json',
            data : form_dataICGV,
            success : function(result) {
                alert("Product was successfully updated.");
                showProductsICGV(); 
            },
            error: function(xhr, resp, text) {
                console.log(xhr.responseText);
                alert("Update failed. Check the console for details.");
            }
        });
        
        return false; 
    });
});