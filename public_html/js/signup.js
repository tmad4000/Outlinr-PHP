$(document).ready(function() {
	var usernameStatus = false;

	$('#signup-form').submit(function() {
		var name = $('#signup-name').val();
		var email = $('#signup-email').val();
		var username = $('#signup-username').val();
		var password = $('#signup-password').val();
		

		// Verification
		var approved = false;
		var emailMatch = email.match(/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/g);
		
		// check if username is free

		if(approved && usernameStatus){
			// check if email is used
			createNewUser();
		}
		else {

		}
		return false;
	});

	$('#signup-username').keyup(function(){
		checkIfUsernameIsFree($('#signup-username').val());
	});

	$('#signup-username').change(function(){
		checkIfUsernameIsFree($('#signup-username').val());
	});

	function checkIfUsernameIsFree(username){
		$.ajax({
			'url': '',
			'data': {'username': username},
			'success': function(jsonData){
				console.log(jsonData);
			}
		});
	}

	function createNewUser(name, email, username, password){
		$.ajax({
			'url': '',
			'data': {'name': name, 'email': email, 'password': password, 'username':username },
			'success': function(jsonData) {
			},
			error: function(err){

			}
		});
	}
});