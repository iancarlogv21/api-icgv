$(document).ready(function(){
    // 1. Show the Form when clicking the "Create" button
    $(document).on('click', '.create-category-button', function(){
        var html = `
            <div class='btn btn-primary pull-right m-b-15px read-category-button'>
                <span class='glyphicon glyphicon-list'></span> Read Categories
            </div>
            <form id='create-category-form'>
                <table class='table table-bordered'>
                    <tr><td>Name</td><td><input type='text' name='name' class='form-control' required /></td></tr>
                    <tr><td>Description</td><td><textarea name='description' class='form-control' required></textarea></td></tr>
                    <tr><td></td><td><button type='submit' class='btn btn-primary'>Create Category</button></td></tr>
                </table>
            </form>`;
        $("#page-content").html(html);
        
        // Ensure this matches the helper function in your app.js
        if(typeof changePageTitleICGV === "function") {
            changePageTitleICGV("Create Category");
        }
    });

    // 2. Submit the Form to the PHP API
    $(document).on('submit', '#create-category-form', function(){
        // Package form data into a JSON object using serializeObjectICGV from app.js
        var form_data = $(this).serializeObjectICGV();
        
        // Debugging: Log the data to the console to ensure it's not empty
        console.log("Sending data to API:", form_data);
        
        $.ajax({
            /* CRITICAL FIX: 
               Target the PHP file that worked in Postman. 
               Based on your errors, the path is:
            */
            url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/create-rec-cat.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(result) {
                // Remove existing alerts and show success message from PHP
                $(".alert").remove();
                $("#page-content").prepend("<div class='alert alert-success'>" + result.message + "</div>");
                
                // Clear the form fields
                $('#create-category-form')[0].reset();
                
                // Refresh the list after 2 seconds
                setTimeout(function(){ 
                    if(typeof showCategoriesICGV === "function") {
                        showCategoriesICGV(); 
                    }
                }, 2000);
            },
            error: function(xhr) {
                $(".alert").remove();
                // This will catch the "Incomplete Data" or "Unable to Create" message
                var errorMessage = "Error: Could not save to database.";
                if(xhr.responseText) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        errorMessage = response.message;
                    } catch(e) {
                        errorMessage = "Server error or invalid path.";
                    }
                }
                $("#page-content").prepend("<div class='alert alert-danger'>" + errorMessage + "</div>");
                console.log("Full Error Response:", xhr.responseText);
            }
        });
        return false;
    });
});