<?php
require_once('inc/private.inc.php');


    if(isset($_REQUEST['username']))
    {
        $user = $_REQUEST['username'];
        $password = $_REQUEST['password'];
        if(strpos(shell_exec(
            "curl --data \"username=$user&password=$password&lt=".CALNET_KEY."&_eventId=submit\" https://auth.berkeley.edu/cas/login"
            ), "success"))
        {
            echo "SUCCESS";
        }
        else
        {
            echo "FAIL";
        }
    }
?>
<form method="POST">
    Username: <input type="text" name="username"/>
    Password: <input type="password" name="password"/>
    <input type="submit" value="Try"/>
</form>