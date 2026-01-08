$(document).ready(function(){
 
    // will run if the delete button was clicked
    $(document).on('click', '.logout-user-button', function(){
         // bootbox for good looking 'confirm pop up'
        bootbox.confirm({        
            message: "<h4>Are you sure you want to log-out??</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if(result==true){ 
                    window.location.href="index.html";
                }
            }
        });
    });
});
