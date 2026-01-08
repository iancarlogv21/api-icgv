$(document).ready(function(){
    // 1. Show the Update Form when "Edit" button is clicked
    $(document).on('click', '.update-category-button', function(){
        // Get the ID from the button attribute
        var id = $(this).attr('data-id');
        
        // Path to read one record to fill the form fields
        var api_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/read-one-cat.php?id=" + id;

        $.getJSON(api_url, function(data){
            var html = `
                <div class='btn btn-primary pull-right m-b-15px read-category-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Categories
                </div>
                <form id='update-category-form'>
                    <input type='hidden' name='id' value='` + id + `' />
                    
                    <table class='table table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' name='name' value='` + data.name + `' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required>` + data.description + `</textarea></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Update Category
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;
            
            $("#page-content").html(html);
            // Check if helper function exists in app.js
            if(typeof changePageTitleICGV === "function") {
                changePageTitleICGV("Update Category");
            }
        });
    });

    // 2. Submit the Update Form to the PHP API
    $(document).on('submit', '#update-category-form', function(){
        // Package form data into a JSON object
        var form_data = $(this).serializeObjectICGV();
        
        $.ajax({
            // Use the filename you confirmed is working in Postman
            url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/update-rec-category.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(result) {
                // Success feedback
                $(".alert").remove();
                $("#page-content").prepend("<div class='alert alert-success'>" + result.message + "</div>");
                
                // Refresh the list after 2 seconds
                setTimeout(function(){ 
                    if(typeof showCategoriesICGV === "function") {
                        showCategoriesICGV(); 
                    }
                }, 2000);
            },
            error: function(xhr) {
                $(".alert").remove();
                $("#page-content").prepend("<div class='alert alert-danger'>Error: Could not update record.</div>");
                console.log("Server Response:", xhr.responseText);
            }
        });
        return false;
    });
});