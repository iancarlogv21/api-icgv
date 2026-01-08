$(document).ready(function(){

    // 1. LISTEN: Click "Read Products" button
    // This handles the click event for the button injected into the form
    $(document).on('click', '.read-product-button', function(){
        showProductsICGV();
    });

    // 2. SHOW FORM: Triggered when "Create Product" button is clicked
    $(document).on('click', '.create-product-button', function(){
        
        // Fetch Categories to populate dropdown
        var category_api_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/read-all-cat.php";

        $.getJSON(category_api_url, function(data){
            
            var categories_options_html=`<select name='category_id' class='form-control' required>`;
            categories_options_html += "<option value=''>Select Category...</option>";
            
            $.each(data.records, function(key, val){
                categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            categories_options_html += `</select>`;

            var create_product_html=`
                <div id='read-products' class='btn btn-primary pull-right m-b-15px read-product-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>

                <form id='create-product-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' name='name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type='number' min='1' step='0.01' name='price' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required></textarea></td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>` + categories_options_html + `</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type='submit' class='btn btn-primary'>
                                    <span class='glyphicon glyphicon-plus'></span> Create Product
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;

            $("#page-content").html(create_product_html);
            changePageTitleICGV("Create Product");
        });
    });

    // 3. SUBMIT FORM: Sends JSON to PHP and Notifies Success
    $(document).on('submit', '#create-product-form', function(){
        
        var form_data = JSON.stringify($(this).serializeObjectICGV());

        $.ajax({
            url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/create-rec-prod.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // Show Success Notification
                $("#page-content").prepend(`
                    <div class='alert alert-success alert-dismissible' role='alert'>
                        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                        <strong>Success!</strong> Product was successfully created.
                    </div>
                `);

                // Reset the form
                $('#create-product-form')[0].reset();

                // Wait 2 seconds, then go back to the product list
                setTimeout(function(){
                    showProductsICGV(); 
                }, 2000);
            },
            error: function(xhr) {
                console.log(xhr.responseText);
                $("#page-content").prepend(`
                    <div class='alert alert-danger alert-dismissible' role='alert'>
                        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                        <strong>Error!</strong> Unable to create product.
                    </div>
                `);
            }
        });
        return false; 
    });
});