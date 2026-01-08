$(document).ready(function(){
    // Handle 'read one' button click
    $(document).off('click', '.read-one-transaction-button').on('click', '.read-one-transaction-button', function(){
        
        var id = $(this).attr('data-id');
        var api_url = getUrl() + "transactions/read-one-trans.php?id=" + id;

        $.getJSON(api_url, function(data){
            var read_one_html = `
                <div class='btn btn-primary pull-right m-b-15px read-transaction-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Transactions
                </div>

                <table class='table table-bordered table-hover'>
                    <tr>
                        <td class='w-30-pct'>Transaction No</td>
                        <td class='w-70-pct'>${data.Transaction_No}</td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>${data.Last_Name}, ${data.First_Name}</td>
                    </tr>
                    <tr>
                        <td>Product</td>
                        <td>${data.Product_Name}</td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td>${data.Quantity}</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td>$${parseFloat(data.Total_Amount).toLocaleString()}</td>
                    </tr>
                    </table>`;

            $("#page-content").html(read_one_html);
            changePageTitleICGV("Transaction Details");
            
        }).fail(function(){
            var error_html = `
                <div class='alert alert-danger'>
                    <span class='glyphicon glyphicon-info-sign'></span> Transaction details could not be loaded.
                </div>
                <button class='btn btn-primary read-transaction-button'>Back to Transactions</button>`;
            $("#page-content").html(error_html);
        });
    });
});