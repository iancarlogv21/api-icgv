$(document).ready(function(){
    // when a 'search products' button was clicked
    $(document).on('submit', '#search-product-form', function(){
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
 
        // get data from the api based on search keywords
        $.getJSON("http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/search-rec-prod.php?s=" + keywords, function(data){
            readProductsTemplate(data, keywords);
            changePageTitleICGV("Search products: " + keywords);
        });
 
        return false;
    }); 
});