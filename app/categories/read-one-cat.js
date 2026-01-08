$(document).ready(function(){
    $(document).on('click', '.read-one-category-button', function(){
        var id = $(this).attr('data-id');
        var api_url = "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/categories/read-one-cat.php?id=" + id;

        $.getJSON(api_url, function(data){
            var html = `
                <div class='btn btn-primary pull-right m-b-15px read-category-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Categories
                </div>
                <table class='table table-bordered'>
                    <tr><td>Name</td><td>` + data.name + `</td></tr>
                    <tr><td>Description</td><td>` + data.description + `</td></tr>
                </table>`;
            $("#page-content").html(html);
            changePageTitleICGV("Category Details");
        }).fail(function(){
            alert("Category does not exist.");
        });
    });
});