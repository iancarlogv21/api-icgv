$(document).ready(function(){
    // show list of products on first load
    $(document).on('click', '.read-product-button', function(){
        showProductsFirstPage();
    });

    // when a pagination button is clicked
    $(document).on('click', '.pagination li', function(){
        // get the json url from the data attribute
        var json_url = $(this).find('a').attr('data-page-product');
        
        // call the function to show products
        if(json_url) {
            showProducts(json_url);
        }
    });
});

// Function to load the very first page
function showProductsFirstPage(){
    var json_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/read-paging-prod.php";
    showProducts(json_url);
}

// Global function to show products from any valid paging URL
function showProducts(json_url){
    $.getJSON(json_url, function(data){
        
        // Use the template from products.js to render the HTML
        readProductsTemplate(data, "");

        // Change the page title
        changePageTitleICGV("Read Products");

    }).fail(function() {
        alert("Error: Unable to load product list. Check if read-paging-prod.php exists.");
    });
}