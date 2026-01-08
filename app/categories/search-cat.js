$(document).ready(function(){
    // Handle Search form submission
    $(document).on('submit', '#search-category-form', function(){
        
        // Get keywords from input field
        var keywords = $(this).find(":input[name='keywords']").val();

        // Path to your Search API (passing keywords as 's')
        var search_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/search-rec-cat.php?s=" + keywords;

        // Tell showCategoriesICGV to render using the search results
        showCategoriesICGV(search_url);

        return false;
    });
});