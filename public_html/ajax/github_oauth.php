<?php
require_once('../../config.inc.php');
// $github_oauth_code = (mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['code'])));
$github_oauth_code = htmlspecialchars($_REQUEST['code']);
// var_dump($github_oauth_code);
$url = 'https://github.com/login/oauth/access_token?';
$data = array(
	'client_id' => '3429c5dd62f9e39cf646',
	'redirect_uri' => 'http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/dev/public_html/ajax/github_oauth.php',
	'client_secret' => '4a965451405d24c4eea43ce362779759b485ce84',
	'code' => $github_oauth_code
);

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

$o = array();
parse_str($result,$o);
$info = "";
http_get("https://api.github.com/user?access_token={$o['access_token']}",array(),$info);
print($info);

?>