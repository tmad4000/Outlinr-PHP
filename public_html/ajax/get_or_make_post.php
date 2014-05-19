<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$body = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['newpost'])));
$mapid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0);
$path = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['path'])));
$usrname = mysqli_real_escape_string($MYSQLI_LINK, (trim($_REQUEST['uid'])));
$uip = $_SERVER['REMOTE_ADDR'];

//for getting a single entry only
if(!empty($_REQUEST['pid']))
		$pid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['pid'])))+0);

$defaultpath="";
$defaultparent=0;

//mit specific #hack
//Utopia/Misc 197/199
if(!$path&&$mapid==3) {
	$path=$defaultpath="197/199/";
	$defaultparent=199; 
}

	
/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$ideastbl = IDEAS_TBL;
$commentstbl = COMMENTS_TBL;
$linkstbl = LINKS_TBL;


function getMap($MYSQLI_LINK,$mapid){
	$query = "SELECT * FROM ideamaps WHERE mapid={$mapid}";
	//echo $query;
	$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
	$r = mysqli_fetch_assoc($result);
	return $r;
}

function curPageURL() {
	 $pageURL = 'http';
	 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	 $pageURL .= "://";
	 if ($_SERVER["SERVER_PORT"] != "80") {
	  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	 } else {
	  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	 }
	 return $pageURL;
}

function emailNotify($MYSQLI_LINK,$mapid,$body){
	if(!LOCAL) {
		$m = getMap($MYSQLI_LINK,$mapid);
		$e = $m['email'];
		$mn = $m['mapname'];
		$u = dirname(dirname(curPageURL()))."/index.1.7_suggestionbox.php?mapid=$mapid";
		$headers  = "From: GestaltBox<noreply@gestaltbox.com>\r\n";
		$headers .= "Reply-To: gestaltbox+$mapid@gmail.com\r\n";
		$b = "Dear $mn,\nWe have a suggestion for you:\n $body\n\nSee all suggestions at $u";
		mail($e,"[GestaltBox] New Suggestion for $mn",$b,$headers);
	}
}

function getRelEntryIds($MYSQLI_LINK,$linkstbl, $pid) {
	$query = "SELECT * FROM $linkstbl WHERE source=$pid AND deleted_time IS NULL ORDER BY time DESC";
	
	$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
	$rows = array();

	while ($r = mysqli_fetch_assoc($result)) {
		$rows[]=$r;
	}
	return $rows;
}

function getAllLinkIds($MYSQLI_LINK,$linkstbl) {
	global $mapid;
	$query = "SELECT * FROM $linkstbl WHERE deleted_time IS NULL ORDER BY time DESC";
	
	$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
	$rows = array();

	while ($r = mysqli_fetch_assoc($result)) {
		$rows[]=$r;
	}
	return $rows;
}



//Create
if (!empty($body)) {
	$tmptitle=mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['ideatitle'])));
	if(!$tmptitle)
		$tmptitle=substr($body,0,80);
    $query = "INSERT INTO $ideastbl (`pid`, `time`, `title`, `body`, `status`, `progress`, `metric`, `uid`, `parent`, `mapid`,`path`,`uip`) VALUES ('', $time, '$tmptitle', '$body', 0, NULL, '', '$usrname',$defaultparent,$mapid,'$path','$uip');";
    
//	print $query;
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));   
	
    // possible concurrency #bug
	$query = "SELECT LAST_INSERT_ID();";
	$result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));   

    emailNotify($MYSQLI_LINK,$mapid,$body);

    require("link.php");
    //hack
}



//Read

//return progress bars info if queried
if($_GET['inProgress']) {
	$query = "SELECT * FROM $ideastbl WHERE body<>'' AND mapid=$mapid AND status > 0 AND deleted_time IS NULL ORDER BY path ASC,status ASC,time DESC";
}
//normally, return suggestions info
else {
	$query = "SELECT * FROM $ideastbl WHERE body<>'' AND mapid=$mapid AND deleted_time IS NULL ORDER BY path ASC,time DESC";
}
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

$rows = array();

$data=array("uid"=>0,"pid"=>NULL,"children"=>array()); //root

while ($r = mysqli_fetch_assoc($result)) {
	
	$pid=$r['pid'];
	$countQuery = "SELECT COUNT(*) FROM $commentstbl WHERE pid=$pid AND deleted_time IS NULL";
	$countResult=mysqli_query($MYSQLI_LINK, $countQuery) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

	$num_comments = (mysqli_fetch_array($countResult));
	$num_comments=$num_comments[0];
	//var_dump($num_comments);
	$r['num_comments']=$num_comments;


	
	//var_dump($num_comments);
	$entry=array_map(trim,array_map(function($e) {
			if(is_string($e)) 
				return stripslashes($e);
			else 
				return $e;
		}, $r));

	
	$entry["children"]=array();
	
	$entry['relEntryIds']=getRelEntryIds($MYSQLI_LINK,$linkstbl,$pid);

		
	$currpath=explode('/',$entry['path']);
	
	$pData= & $data['children'];
	

	foreach($currpath as $pid) {
		if($pid!=='')
			$pData= & $pData["pid".$pid]['children'];
	}
	$pData["pid".(string)$entry['pid']]=$entry;

	$rows[]= $entry;
	
}

$allLinks=getAllLinkIds($MYSQLI_LINK,$linkstbl);

print json_encode(array("treePosts"=>$data,"flatPosts"=>$rows,"links"=>$allLinks));
// print json_encode(array("treePosts"=>$data,"flatPosts"=>$rows,"links"=>$allLinks));