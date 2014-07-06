<?php
require_once('../../config.inc.php');

$github_oauth_code = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['code']))+0);

$url = 'https://github.com/login/oauth/access_token?';
$data = array('client_id' => '3429c5dd62f9e39cf646', 'redirect_uri' => 'http://dev.ideajoin.com/github_oauth.php', 'client_secret' => '4a965451405d24c4eea43ce362779759b485ce84', 'code' => $code);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

var_dump($result);

?>