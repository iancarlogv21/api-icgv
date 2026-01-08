// Inside $(document).ready()
$(document).off('submit', '#search-transaction-form').on('submit', '#search-transaction-form', function(e) {
    e.preventDefault(); 
    
    var keywords = $(this).find(":input[name='keywords']").val();
    var search_url = getUrl() + "transactions/search-rec-trans.php?s=" + keywords;
    
    $.getJSON(search_url, function(data) {
        readTransactionTemplateICGV(data, keywords);
    }).fail(function() {
        // Handle empty results but keep the table headers
        var empty_data = { records: [] };
        readTransactionTemplateICGV(empty_data, keywords);
    });
    
    return false;
});