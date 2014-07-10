<?php
require_once('../../config.inc.php');
include '../inc/github-api/github-api.php';

use Milo\Github;

session_start();

$clientId = '3429c5dd62f9e39cf646';
$clientSecret = '4a965451405d24c4eea43ce362779759b485ce84';

$config = new Github\OAuth\Configuration($clientId, $clientSecret, ['user']);
$storage = new Github\Storages\SessionStorage; 
$login = new Github\OAuth\Login($config, $storage);

// # Your application URL
$appUrl = 'http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/dev/public_html/ajax/github_oauth.php';

# Token obtaining
if ($login->hasToken()) {
    $token = $login->getToken();
} 
else {
    if (isset($_GET['back'])) {
        $token = $login->obtainToken($_GET['code'], $_GET['state']);
        header("Location: $appUrl");  # drop the 'code' and 'state' from URL
        die();
    } 
    else {
        # Performs redirect to Github page
        $login->askPermissions("$appUrl?back=1");
    }
}

$api = new Milo\Github\Api;
$api->setToken($token);
$api->setDefaultParameters(['client_id' => $clientId, 'client_secret' => $clientSecret]);

$response = $api->get('/user');
var_dump($response);
// $emojis = $api->decode($response);
// var_dump($emojis);


// $github_oauth_code = htmlspecialchars($_REQUEST['code']);
// // var_dump($github_oauth_code);
// $data = array(
// 	'client_id' => '3429c5dd62f9e39cf646',
// 	'redirect_uri' => 'http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/dev/public_html/ajax/github_oauth.php',
// 	'client_secret' => '4a965451405d24c4eea43ce362779759b485ce84',
// 	'code' => $github_oauth_code
// );

// // use key 'http' even if you send the request to https://...
// $options = array(
//     'http' => array(
//         'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .  "Accept: application/json" . "Content-Length: ". strlen($post) . "rn",
//         'method'  => 'POST',
//         'content' => http_build_query($data),
//     ),
// );

// $context  = stream_context_create($options);

// // use Milo\Github;

// // $api = new Milo\Github\Api;
// // $api->setToken($token);
// // $api->setDefaultParameters(['client_id' => '3429c5dd62f9e39cf646', 'client_secret' => '4a965451405d24c4eea43ce362779759b485ce84']);
// // $client = $api->getClient();
// // $request = $api->createRequest('GET', '/api/path', [], ['Content-Type' => '...'], '');
// // $request = new Milo\Github\Http\Request('GET', 'https://github.com/v3/api/path', [...]);
// // # Send the request, get the response
// // $response = $api->request($request);

// // # Response body decoder (read below)
// // $data = $api->decode($response);

// $json_data = file_get_contents("https://github.com/login/oauth/access_token", false, $context);
             
// $r = json_decode($json_data , true);

// $access_token = $r['access_token'];
// var_dump($access_token);

// // $url = "https://api.github.com/user?access_token=$access_token";

// // $data = file_get_contents($url);

// // $user_data  = json_decode($data , true);
// // $username = $user_data['login'];


// // $emails =  file_get_contents("https://api.github.com/user/emails?access_token=$access_token");
// // $emails = json_decode($emails , true);
// // $email = $emails[0];

// // $signup_data = array(
// // 'username' => $username ,
// // 'email' => $email ,
// // 'source' => 'github' ,
// // );

// // var_dump($signup_data);

?>