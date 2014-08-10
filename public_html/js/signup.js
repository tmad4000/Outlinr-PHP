$(document).ready(function() {
  
  function validateEmail(emailEntry){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailEntry);
  }

  function checkWhetherExists(emailEntry){

  }

  $('#signup-email').keyup(function(){
    
  });

  $('#signup-email').change(function(){
    
  });

});
