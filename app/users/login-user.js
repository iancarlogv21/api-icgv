$(document).ready(function(){ 
    showLogForm();

    $(document).on('submit', '#log-user-form', function(){
        // Use the ICGV helper to package data
        var form_data_json = $(this).serializeObjectICGV();
        var form_data = JSON.stringify(form_data_json);

        $.ajax({
            url: "http://localhost/sia101-BSIT3D-ICGV/code-BSIT3D-ICGV/module5-files/api-icgv/login.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {           
                window.location.href="home.html"; // Success redirect
            },
            error: function(xhr) {
                // Captures "Data is incomplete" or "Invalid credentials"
                console.log(xhr.responseText);
                alert("Login Failed: Check your username and password.");             
            }
        });        
        return false;
    }); 
});

// function to show list of course
function showLogForm(){     
        var login_user_html=`
        <div class='container bgContainer'>
        <div>
        <form class='form-signin' id='log-user-form' name="frmLogIn" action='#' method='post' border='0'>            
            <h3 class='form-signin-heading fontWhite'>USER LOG-IN</h3>
            <br>
            <label for='User_Name' nameclass='sr-only' class='fontWhite'>User Name:</label>
            <input type='text' name='User_Name' id='User_Name' class='form-control' placeholder='User Name' required autofocus>
            <br>
            <label for='Password' nameclass='sr-only' class='fontWhite'>Password:</label>
            <input type='password' name='Password' id='Password' class='form-control' placeholder='Password' required>
            <br>
            <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
            <br>
            <p align='justify' class='fontWhite'>Please login using your valid User Name and Password! In case of problem, please consult our system administrator.<p/>
        </form>     
        </div>
        </div>`;
        $("#page-content").html(login_user_html);   
        
}
