function readTransactionTemplate(data, keywords) {
    var read_transaction_html = `
        <form id='search-transaction-form' action='#' method='post'>
            <div class='input-group pull-left w-30-pct'>
                <input type='text' value='` + keywords + `' name='keywords' class='form-control transaction-search-keywords' placeholder='Search transactions...' />
                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>
 
        <div id='create-transaction' class='btn btn-primary pull-right m-b-15px create-transaction-button'>
            <span class='glyphicon glyphicon-plus'></span> Create Transaction
        </div>
 
        <table class='table table-bordered table-hover'>
            <tr>
                <th class='w-11-pct'>Transaction No</th>
                <th class='w-10-pct'>Customer No</th>
                <th class='w-20-pct'>Customer Name</th>
                <th class='w-8-pct'>Product Name</th>
                <th class='w-5-pct'>Quantity</th>
                <th class='w-5-pct'>Total Amount</th>
                <th class='w-25-pct text-align-center'>Action</th>
            </tr>`;
 
    // Loop through returned list of data
    // Added a check to ensure data.records exists before looping
    if (data.records && data.records.length > 0) {
        $.each(data.records, function(key, val) {
            read_transaction_html += `
                <tr>
                    <td>` + val.Transaction_No + `</td>
                    <td>` + val.Customer_No + `</td>
                    <td>` + val.Last_Name + ", " + val.First_Name + " " + val.Middle_Name + `</td>
                    <td>` + val.Product_Name + `</td>
                    <td>` + val.Quantity + `</td>
                    <td>` + val.Total_Amount + `</td>
                    <td style='text-align:center'>
                        <button class='btn btn-primary m-r-10px read-one-transaction-button' data-id='` + val.Transaction_ID + `'>
                            <span class='glyphicon glyphicon-eye-open'></span> Read
                        </button>
                        <button class='btn btn-info m-r-10px update-transaction-button' data-id='` + val.Transaction_ID + `'>
                            <span class='glyphicon glyphicon-edit'></span> Edit
                        </button>
                        <button class='btn btn-danger delete-transaction-button' data-id='` + val.Transaction_ID + `'>
                            <span class='glyphicon glyphicon-remove'></span> Delete
                        </button>
                    </td>
                </tr>`;
        });
    } else {
        read_transaction_html += "<tr><td colspan='7' class='text-center'>No transactions found.</td></tr>";
    }
 
    read_transaction_html += `</table>`;

    $("#app").html(read_transaction_html);
 
    // Pagination logic
    if (data.paging) {
        read_transaction_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
        if (data.paging.first != "") {
            read_transaction_html += "<li><a data-page-transaction='" + data.paging.first + "'>First Page</a></li>";
        }
        $.each(data.paging.pages, function(key, val) {
            var active_page = val.current_page == "yes" ? "class='active'" : "";
            read_transaction_html += "<li " + active_page + "><a data-page-transaction='" + val.url + "'>" + val.page + "</a></li>";
        });
        if (data.paging.last != "") {
            read_transaction_html += "<li><a data-page-transaction='" + data.paging.last + "'>Last Page</a></li>";
        }
        read_transaction_html += "</ul>";
    }
 
    // FIXED: Inject to '#app' instead of '#page-content' to match home.html
    $("#app").html(read_transaction_html);
}