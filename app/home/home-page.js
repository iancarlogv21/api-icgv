// app/home/home-page.js

$(document).ready(function(){ 
    // PRIORITY: This ensures the home page shows up immediately on first load
    showHomePageICGV();   

    // Listener for the "Home" link in the navbar
    $(document).off('click', '.show-home-button').on('click', '.show-home-button', function(e) {
        e.preventDefault();
        showHomePageICGV();
    });

    // Listener for the "Project Name" brand in the navbar
    $(document).off('click', '.navbar-brand').on('click', '.navbar-brand', function(e) {
        e.preventDefault();
        showHomePageICGV();
    });
});

// Function to show the original module home page content
function showHomePageICGV(){     
    var home_page_html = `
        <main role='main'>
            <div class='jumbotron bg-light border-bottom p-5 mb-4'>
                <div class='container'>
                   
                    <p style="text-align:justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. In nisl nisi scelerisque eu ultrices vitae auctor. 
                        Commodo elit at imperdiet dui accumsan. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Rhoncus urna 
                        neque viverra justo. Cursus sit amet dictum sit amet justo donec enim. Ligula ullamcorper malesuada proin libero. Porttitor lacus 
                        luctus accumsan tortor posuere ac. Sapien pellentesque habitant morbi tristique senectus et. Vivamus arcu felis bibendum ut tristique. 
                        Sed faucibus turpis in eu mi bibendum neque. Vestibulum morbi blandit cursus risus at. Gravida cum sociis natoque penatibus et magnis dis 
                        parturient. Mauris pharetra et ultrices neque ornare. Augue interdum velit euismod in pellentesque massa. Purus ut faucibus pulvinar elementum. 
                        Nunc sed velit dignissim sodales ut eu sem. Lacus viverra vitae congue eu consequat ac felis donec et.</p>
                        
                    <p style="text-align:justify">Diam sollicitudin tempor id eu nisl nunc. Integer feugiat scelerisque varius morbi enim nunc faucibus. Sit amet nisl suscipit adipiscing bibendum. 
                        Nullam non nisi est sit amet. Ullamcorper sit amet risus nullam. Amet tellus cras adipiscing enim eu. Quam pellentesque nec nam aliquam sem et tortor 
                        consequat. Pulvinar elementum integer enim neque volutpat ac. Dignissim convallis aenean et tortor at risus viverra. Aliquet bibendum enim facilisis 
                        gravida. Vitae et leo duis ut diam quam nulla porttitor massa. Mauris augue neque gravida in fermentum et sollicitudin. Ut etiam sit amet nisl. Auctor 
                        elit sed vulputate mi. Gravida rutrum quisque non tellus orci ac. Nunc pulvinar sapien et ligula. </p>
                        
                    <p style="text-align:justify">Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Scelerisque purus semper eget duis at. Consequat semper viverra nam libero justo 
                        laoreet. Vulputate dignissim suspendisse in est ante. Gravida cum sociis natoque penatibus et magnis. Id donec ultrices tincidunt arcu non. Massa massa 
                        ultricies mi quis hendrerit dolor magna eget est. Pharetra massa massa ultricies mi quis hendrerit_ dolor. Habitant morbi tristique senectus et netus et
                        malesuada. Sed sed risus pretium quam vulputate. </p>
                </div>
            </div>       
        </main>
        <footer class='container mt-5'>
            <hr>
            <p>&copy; Project Name Record Management System 2024-2025</p>
        </footer>
    `;

    // Inject into the #page-content div
    $("#page-content").html(home_page_html); 

    // Update the title using the ICGV function from app.js
    if(typeof changePageTitleICGV === "function") {
        changePageTitleICGV("Project Name");
    }
}