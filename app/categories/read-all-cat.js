$(document).ready(function(){
    
    // 1. Navbar Link Listener
    $(document).off('click', '.read-category-button').on('click', '.read-category-button', function(){
        showCategoriesICGV(); 
    });

    // 2. Pagination Listener (Unique to Categories to prevent jumping)
    $(document).off('click', 'a[data-page-cat]').on('click', 'a[data-page-cat]', function(){
        var json_url = $(this).attr('data-page-cat');
        
        // Extract keywords from URL to maintain the label during paging
        var urlParams = new URLSearchParams(json_url.split('?')[1]);
        var keywords = urlParams.get('s') || "";
        
        showCategoriesICGV(json_url, keywords);
    });

    // 3. Search Form Listener (Fixed: Correct API path & No Reload)
    $(document).off('submit', '#search-category-form').on('submit', '#search-category-form', function(e){
        e.preventDefault(); 
        var keywords = $(this).find(":input[name='keywords']").val();
        
        // Using your actual file: search-rec-cat.php
        var api_url = getUrl() + "categories/search-rec-cat.php?s=" + keywords;
        
        showCategoriesICGV(api_url, keywords);
        return false; 
    });
});

/**
 * Main Function to fetch and display Category List
 */
function showCategoriesICGV(json_url, keywords = ""){

    var api_url = json_url || getUrl() + "categories/read-paging-cat.php";
    
    // UI Logic for Dynamic Search Label with Icon
    var searchLabel = keywords 
        

    $.getJSON(api_url, function(data){

        var read_categories_html = `
            <div class='row m-b-15px'>
                <div class='col-md-12'>
                    ${searchLabel}
                    
                    <form id='search-category-form' action='#' method='post'>
                        <div class='input-group pull-left w-30-pct'>
                            <input type='text' name='keywords' value='${keywords}' class='form-control' placeholder='Search categories...' />
                            <span class='input-group-btn'>
                                <button type='submit' class='btn btn-default'>
                                    <span class='glyphicon glyphicon-search'></span>
                                </button>
                            </span>
                        </div>
                    </form>
                    
                    <div class='btn btn-primary pull-right create-category-button'>
                        <span class='glyphicon glyphicon-plus'></span> Create Category
                    </div>
                </div>
            </div>

            <table class='table table-hover table-bordered'>
                <tr class='bg-light'>
                    <th style='width:25%'>Name</th>
                    <th style='width:45%'>Description</th>
                    <th style='width:30%' class='text-center'>Action</th>
                </tr>`;

        // 4. Build Table Rows with Icons and spacing m-r-10px
        if(data.records && data.records.length > 0){
            $.each(data.records, function(key, val){
                read_categories_html+=`
                    <tr>
                        <td>${val.name}</td>
                        <td>${val.description}</td>
                        <td style='text-align:center'>
                            <button class='btn btn-primary m-r-10px read-one-category-button' data-id='${val.id}'>
                                <span class='glyphicon glyphicon-eye-open'></span> Read
                            </button>
                            <button class='btn btn-info m-r-10px update-category-button' data-id='${val.id}'>
                                <span class='glyphicon glyphicon-edit'></span> Edit
                            </button>
                            <button class='btn btn-danger delete-category-button' data-id='${val.id}'>
                                <span class='glyphicon glyphicon-remove'></span> Delete
                            </button>
                        </td>
                    </tr>`;
            });
        } else {
            read_categories_html += "<tr><td colspan='3' class='text-center'>No records found.</td></tr>";
        }
        read_categories_html += "</table>";

        // 5. Pagination: Left-aligned with First/Last Page
        if(data.paging){
            read_categories_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
            
            if(data.paging.first != ""){
                read_categories_html += `<li><a data-page-cat='${data.paging.first}'>First Page</a></li>`;
            }

            $.each(data.paging.pages, function(key, val){
                var active_class = val.current_page == "yes" ? "class='active'" : "";
                read_categories_html += `<li ${active_class}><a data-page-cat='${val.url}'>${val.page}</a></li>`;
            });

            if(data.paging.last != ""){
                read_categories_html += `<li><a data-page-cat='${data.paging.last}'>Last Page</a></li>`;
            }

            read_categories_html += "</ul>";
        }

        $("#page-content").html(read_categories_html);
        changePageTitleICGV("Read Categories");

    }).fail(function() {
        // Handle no results by re-rendering the search bar so user can search again
        var no_results_html = `
            <div class='row m-b-15px'>
                <div class='col-md-12'>
                    ${searchLabel}
                    <div class='alert alert-info'>No records found matching your search.</div>
                    <button class='btn btn-primary read-category-button'>Back to Categories</button>
                </div>
            </div>`;
        $("#page-content").html(no_results_html);
    });
}