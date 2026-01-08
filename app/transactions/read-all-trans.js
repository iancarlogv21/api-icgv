/**
 * 1. Controller: Fetches the data
 */
function showTransactionFirstPageICGV() {
    var api_url = getUrl() + "transactions/read-paging-trans.php"; 
    
    $.getJSON(api_url, function(data) {
        readTransactionTemplateICGV(data, "");
    }).fail(function(jqXHR) {
        var error_msg = `<div class='alert alert-danger'>
            <strong>Error!</strong> Could not load transactions. <br>
            Status: ${jqXHR.status} - ${jqXHR.statusText}
        </div>`;
        $("#page-content").html(error_msg);
    });
}

/**
 * 2. Template Loader
 */
function readTransactionTemplateICGV(data, keywords = "") {

    var searchLabel = keywords 
       

    var read_transaction_html = `
        <style>
            .locked-table {
                table-layout: fixed !important;
                width: 100% !important;
            }
            .locked-table td {
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
        </style>

        <div class='row m-b-15px'>
            <div class='col-md-12'>
                ${searchLabel}
                <form id='search-transaction-form' action='#' method='post'>
                    <div class='input-group pull-left w-30-pct'>
                        <input type='text' name='keywords' value='${keywords}' class='form-control' placeholder='Search transactions...' />
                        <span class='input-group-btn'>
                            <button type='submit' class='btn btn-default'>
                                <span class='glyphicon glyphicon-search'></span>
                            </button>
                        </span>
                    </div>
                </form>
                <div class='btn btn-primary pull-right create-transaction-button'>
                    <span class='glyphicon glyphicon-plus'></span> Create Transaction
                </div>
            </div>
        </div>

        <table class='table table-hover table-bordered locked-table'>
            <thead>
                <tr class='bg-light'>
                    <th style='width:18%'>Trans No</th>
                    <th style='width:10%'>Cust No</th>
                    <th style='width:15%'>Customer Name</th>
                    <th style='width:17%'>Product</th>
                    <th style='width:10%'>Total</th>
                    <th style='width:30%' class='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>`;

    if (data.records && data.records.length > 0) {
        $.each(data.records, function(key, val) {
    read_transaction_html += `
    <tr>
        <td title="${val.Transaction_No}">${val.Transaction_No}</td>
        <td>${val.Customer_No}</td>
        <td title="${val.Last_Name}, ${val.First_Name}">${val.Last_Name}, ${val.First_Name}</td>
        <td title="${val.Product_Name}">${val.Product_Name}</td>
        <td>$${parseFloat(val.Total_Amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td class='text-center'>
            <button class='btn btn-primary btn-sm m-r-5px read-one-transaction-button' data-id='${val.Transaction_ID}'>
                <span class='glyphicon glyphicon-eye-open'></span> Read
            </button>
            <button class='btn btn-info btn-sm m-r-5px update-transaction-button' data-id='${val.Transaction_ID}'>
                <span class='glyphicon glyphicon-edit'></span> Edit
            </button>
            <button class='btn btn-danger btn-sm delete-transaction-button' data-id='${val.Transaction_ID}'>
                <span class='glyphicon glyphicon-remove'></span> Delete
            </button>
        </td>
    </tr>`;
});
    } else {
        read_transaction_html += "<tr><td colspan='6' class='text-center'>No records found.</td></tr>";
    }
    read_transaction_html += "</tbody></table>";

    if (data.paging) {
        read_transaction_html += "<ul class='pagination pull-left m-b-15px m-t-0px'>";
        if (data.paging.first != "") {
            read_transaction_html += `<li><a data-page-trans='${data.paging.first}'>First Page</a></li>`;
        }
        $.each(data.paging.pages, function(key, val) {
            var active_class = val.current_page == "yes" ? "class='active'" : "";
            read_transaction_html += `<li ${active_class}><a data-page-trans='${val.url}'>${val.page}</a></li>`;
        });
        if (data.paging.last != "") {
            read_transaction_html += `<li><a data-page-trans='${data.paging.last}'>Last Page</a></li>`;
        }
        read_transaction_html += "</ul>";
    }

    $("#page-content").html(read_transaction_html);
    changePageTitleICGV("Read Transactions");
}

/**
 * 3. Event Listeners
 */
$(document).ready(function() {
    
    // Main Nav Button
    $(document).off('click', '.read-transaction-button').on('click', '.read-transaction-button', function() {
        showTransactionFirstPageICGV();
    });

    // PAGING LISTENER (The part that was missing)
    $(document).off('click', 'a[data-page-trans]').on('click', 'a[data-page-trans]', function() {
        var json_url = $(this).attr('data-page-trans');
        
        $.getJSON(json_url, function(data) {
            // Check if current URL has a search param to maintain search labels
            var urlParams = new URLSearchParams(json_url.split('?')[1]);
            var keywords = urlParams.get('s') || "";
            
            readTransactionTemplateICGV(data, keywords);
        });
    });

    // SEARCH LISTENER
    $(document).off('submit', '#search-transaction-form').on('submit', '#search-transaction-form', function(e) {
        e.preventDefault(); 
        var keywords = $(this).find(":input[name='keywords']").val();
        var search_url = getUrl() + "transactions/search-rec-trans.php?s=" + keywords;
        
        $.getJSON(search_url, function(data) {
            readTransactionTemplateICGV(data, keywords);
        });
        return false;
    });
});