<?php
session_start();
//include at the top of every PHP page
$_SERVER['DOCUMENT_ROOT'] = dirname(__FILE__);


// Determine whether we're working on a local server
// or on the real server:
if (stristr($_SERVER['HTTP_HOST'], 'local') || (substr($_SERVER['HTTP_HOST'], 0, 7) == '192.168')) {
	define('LOCAL',true);
} else {
	define('LOCAL',false);
}

// Determine location of files and the URL of the site:
// Allow for development on different servers.
if (LOCAL) {

	// Always debug when running locally:
	define('DEBUG_MODE',true);

	// Define the constants:
	//define ('BASE_URI', '/path/to/html/folder/');
	//define ('BASE_URL',	'http://localhost/directory/');
	
} else {

	define('DEBUG_MODE',false);
	//define ('BASE_URI', '/path/to/live/html/folder/');
	//define ('BASE_URL',	'http://www.example.com/');
	
} 

define('PATH_SEP', '/');
define('PATH', $_SERVER['DOCUMENT_ROOT'].PATH_SEP.'public_html');

if(!DEBUG_MODE) {
	//no error reporting
	ini_set('display_errors',0);
	error_reporting(null);
}
else {
	//all error reporting
	ini_set('display_errors',1);
	error_reporting(E_ALL & ~ E_NOTICE);
}

if(!isset($isMobile))
	$isMobile=false; //for monitor disply, eg pika