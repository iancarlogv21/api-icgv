$(document).ready(function() {
    
    // 1. Show form - Added .off() to prevent duplication
    $(document).off('click', '.create-transaction-button').on('click', '.create-transaction-button', function() {

        var strYear = new Date().getFullYear();
        var transNo = "TRS-" + strYear + "-" + Math.floor(1000 + Math.random() * 9000);

        $.getJSON(getUrl() + "products/read-all-prod.php", function(data) {
            var products_options_html = `<select id="Product_ID" name='Product_ID' class='form-control search-product-button' required>
                                            <option value="">Select Product...</option>`;
            $.each(data.records, function(key, val) {
                products_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            products_options_html += `</select>`;

            var create_transaction_html = `
            
            
<div class='text-right mb-3'>
    <div id='read-transactions' class='btn btn-primary read-transaction-button'>
        <span class='glyphicon glyphicon-list'></span> Read transactions
    </div>
</div>

            <form id='create-transaction-form'>
                <table class='table table-hover table-bordered'>
                    <tr><td>Transaction No:</td><td><input type='text' name='Transaction_No' value="` + transNo + `" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr>
                        <td>Customer No:</td>
                        <td>
                            <div class='input-group'>
                                <input type='text' id="Customer_No" name="Customer_No" class='form-control' placeholder="Enter Customer No..." required />
                                <span class='input-group-btn'>
                                    <button type='button' class='btn btn-primary search-customer-button'><span class='glyphicon glyphicon-search'></span></button>
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr><td>Last Name:</td><td><input type='text' id="Last_Name" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr><td>First Name:</td><td><input type='text' id="First_Name" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr><td>Middle Name:</td><td><input type='text' id="Middle_Name" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr><td>Category:</td><td>` + products_options_html + `</td></tr>
                    <tr><td>Unit Price:</td><td><input type='number' id="Price" name="Price" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr><td>Quantity:</td><td><input type='number' id="Quantity" name="Quantity" class='form-control' required /></td></tr>
                    <tr><td>Total Amount:</td><td><input type='number' id="Total_Amount" name="Total_Amount" class='form-control' readonly style='background-color: #eee;'/></td></tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type='button' class='btn btn-primary compute-transaction-button'><span class='glyphicon glyphicon-list-alt'></span> Compute Amount</button>
                            <button type='submit' class='btn btn-primary'><span class='glyphicon glyphicon-plus'></span> Create Transaction</button>
                        </td>
                    </tr>
                </table>
            </form>`;

            $("#page-content").html(create_transaction_html);
            if (typeof changePageTitleICGV === "function") { changePageTitleICGV("Create Transaction"); }
        });
    });

    // 2. Handle Form Submission with Success Message
    $(document).off('submit', '#create-transaction-form').on('submit', '#create-transaction-form', function() {
        var form_data = JSON.stringify($(this).serializeObjectICGV());

        $.ajax({
            url: getUrl() + "transactions/create-rec-trans.php",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function(result) {
                // Remove any old alerts
                $(".alert").remove();
                
                // Show success notification
                $("#page-content").prepend("<div class='alert alert-success'>Transaction successfully created!</div>");
                
                // Wait 2 seconds so the user can see the message, then redirect
                setTimeout(function(){
                    if (typeof showTransactionFirstPageICGV === "function") {
                        showTransactionFirstPageICGV();
                    }
                }, 2000);
            },
            error: function(xhr) {
                $(".alert").remove();
                $("#page-content").prepend("<div class='alert alert-danger'>Unable to create transaction.</div>");
                console.log(xhr.responseText);
            }
        });
        return false;
    });

    // 3. Helper Logic
    $(document).off('change', '.search-product-button').on('change', '.search-product-button', function() { 
        var id = $(this).val();
        $.getJSON(getUrl() + "products/read-one-prod.php?id=" + id, function(data) { 
            var productPrice = data.Price || data.price; 
            $("#Price").val(productPrice); 
        });
    });

    $(document).off('click', '.search-customer-button').on('click', '.search-customer-button', function() { 
        var id = $("#Customer_No").val();
        $.getJSON(getUrl() + "customers/read-one-cust.php?id=" + id, function(data) { 
            $("#Last_Name").val(data.Last_Name);
            $("#First_Name").val(data.First_Name);
            $("#Middle_Name").val(data.Middle_Name);
        });
    });

    $(document).off('click', '.compute-transaction-button').on('click', '.compute-transaction-button', function() {
        var price = $("#Price").val();
        var qty = $("#Quantity").val();
        $("#Total_Amount").val(price * qty);
    });
});