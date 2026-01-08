$(document).ready(function(){
    $(document).on('click', '.read-one-product-button', function(){
        var idICGV = $(this).attr('data-id');
        var api_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/products/read-one-prod.php?id=" + idICGV;

        $.getJSON(api_url, function(dataICGV){
            var read_one_html = `
                <div class='btn btn-primary pull-right m-b-15px read-product-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>
                <table class='table table-bordered table-hover'>
                    <tr><td>Name</td><td>` + dataICGV.name + `</td></tr>
                    <tr><td>Price</td><td>$` + dataICGV.price + `</td></tr>
                    <tr><td>Description</td><td>` + dataICGV.description + `</td></tr>
                    <tr><td>Category</td><td>` + dataICGV.category_name + `</td></tr>
                </table>`;
            $("#page-content").html(read_one_html);
            changePageTitleICGV("Product Details");
        });       
    }); 
});