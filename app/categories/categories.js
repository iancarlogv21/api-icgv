// Function to generate the Category List HTML (Template)
function readCategoriesTemplate(data, keywords) {
    var read_categories_html = `
        <form id='search-category-form' action='#' method='post'>
            <div class='input-group pull-left w-30-pct m-b-15px'>
                <input type='text' value='` + keywords + `' name='keywords' class='form-control category-search-keywords' placeholder='Search categories...' />
                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>

        <div class='btn btn-primary pull-right m-b-15px create-category-button'>
            <span class='glyphicon glyphicon-plus'></span> Create Category
        </div>

        <table class='table table-hover table-bordered'>
            <tr>
                <th class='w-25-pct'>Name</th>
                <th class='w-50-pct'>Description</th>
                <th class='w-25-pct text-center'>Action</th>
            </tr>`;

    // Loop through returned records
    $.each(data.records, function(key, val) {
        read_categories_html += `
            <tr>
                <td>` + val.name + `</td>
                <td>` + val.description + `</td>
                <td style='text-align:center'>
                    <button class='btn btn-primary m-r-10px read-one-category-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Read
                    </button>
                    <button class='btn btn-info m-r-10px update-category-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
                    <button class='btn btn-danger delete-category-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
            </tr>`;
    });

    read_categories_html += `</table>`;

    // Pagination Logic
    if (data.paging) {
        read_categories_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
        
        // First page button
        if (data.paging.first != "") {
            read_categories_html += "<li><a data-page='" + data.paging.first + "'>First Page</a></li>";
        }

        // Loop through page buttons
        $.each(data.paging.pages, function(key, val) {
            var active_page = val.current_page == "yes" ? "class='active'" : "";
            read_categories_html += "<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
        });

        // Last page button
        if (data.paging.last != "") {
            read_categories_html += "<li><a data-page='" + data.paging.last + "'>Last Page</a></li>";
        }
        read_categories_html += "</ul>";
    }

    // Inject to 'page-content'
    $("#page-content").html(read_categories_html);
}