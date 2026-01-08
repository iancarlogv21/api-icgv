$(document).ready(function(){
 
    // Handle Edit button click
    $(document).off('click', '.update-transaction-button').on('click', '.update-transaction-button', function(){
        
        var id = $(this).attr('data-id');
        
        // 1. Fetch current transaction details
        $.getJSON(getUrl() + "transactions/read-one-trans.php?id=" + id, function(transData){
            
            // 2. Fetch all products for the dropdown
            $.getJSON(getUrl() + "products/read-all-prod.php", function(prodData){
 
                var update_trans_html=`
                    <div class='text-right mb-3'>
                        <div class='btn btn-primary read-transaction-button'>
                            <span class='glyphicon glyphicon-list'></span> Read Transactions
                        </div>
                    </div>

                    <form id='update-transaction-form' action='#' method='post'>
                        <table class='table table-hover table-bordered'>
                            <tr class='bg-light'>
                                <td class='w-30-pct'>Transaction No</td>
                                <td class='w-70-pct'><strong>${transData.Transaction_No}</strong></td>
                            </tr>
                            <tr>
                                <td>Customer Name</td>
                                <td>${transData.Last_Name}, ${transData.First_Name}</td>
                            </tr>

                            <tr>
                                <td>Order Product</td>
                                <td>
                                    <select name='Product_ID' class='form-control' id='prod-select' required>`;
                                        
                                        $.each(prodData.records, function(key, val){
                                            var selected = (val.id == transData.Product_ID) ? "selected" : "";
                                            update_trans_html += `<option value='${val.id}' data-price='${val.price}' ${selected}>${val.name} ($${val.price})</option>`;
                                        });

                update_trans_html += `
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>
                                    <input type='number' name='Quantity' id='qty-input' value="${transData.Quantity}" class='form-control' min='1' required />
                                </td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td>
                                    <div class='input-group'>
                                        <span class='input-group-addon'>$</span>
                                        <input type='text' name='Total_Amount' id='total-amount' value="${transData.Total_Amount}" class='form-control' readonly />
                                    </div>
                                    <small class='text-muted'>Auto-calculated based on Selection and Quantity.</small>
                                </td>
                            </tr>
                            <tr>
                                <td><input type='hidden' name='id' value='${id}' /></td>
                                <td>
                                    <button type='submit' class='btn btn-info'>
                                        <span class='glyphicon glyphicon-edit'></span> Save Changes
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>`;

                $("#page-content").html(update_trans_html);
                changePageTitleICGV("Update Transaction");
            });
        });
    });

    // AUTO-CALCULATION logic
    $(document).on('change', '#prod-select, #qty-input', function(){
        var price = $('#prod-select option:selected').data('price') || 0;
        var qty = $('#qty-input').val() || 0;
        var total = parseFloat(price) * parseInt(qty);
        $('#total-amount').val(total.toFixed(2));
    });
     
    // FIXED: Submit form logic
    $(document).off('submit', '#update-transaction-form').on('submit', '#update-transaction-form', function(){
        
        // CHANGED serializeObject to serializeObjectICGV to match your app.js helper
        var form_data = JSON.stringify($(this).serializeObjectICGV());
        
        $.ajax({
            // Ensure this filename matches your PHP file (usually update-rec-trans.php)
            url: getUrl() + "transactions/update-trans.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                bootbox.alert("Transaction updated successfully!", function(){
                    showTransactionFirstPageICGV(); 
                });
            },
            error: function(xhr, resp, text) {
                console.log(xhr.responseText);
                alert("Update failed. Check the console.");
            }
        });
        return false;
    });
});