$(document).ready(function(){
    // Restoring the H1 tag is important so the titles show up
    var app_html=`
        <div class='container'>
            <div class='page-header'>
                <h1 id='page-title'></h1>
            </div>
            <div id='page-content' style='margin-top:20px;'></div>
        </div>`;

    $("#app").html(app_html);
});

// app/app.js

// This function MUST be defined globally
function getUrl(){
    return "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/";
}

// Needed for the transaction lists to show titles
function changePageTitleICGV(page_title){
    $('#page-title').text(page_title);
    document.title = page_title;
}

// Ensure these exist for the Create Transaction form
function getAldo(){
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day;
}

function getOras(){
    var date = new Date();
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

// Package form data into JSON
$.fn.serializeObjectICGV = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) o[this.name] = [o[this.name]];
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};