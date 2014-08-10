$(document).ready(function(){
    $('#search-ideas').keyup(function(e){
        if(e.keyCode == 13){
           window.location = "ideafeed.php" 
        }
    });
})

