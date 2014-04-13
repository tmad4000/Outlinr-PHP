<?php 

require_once('../config.inc.php');

?>

<!DOCTYPE html>
<html>
<head>
  <?php 
  require_once('inc/mysql.inc.php');
  include_once("inc/analyticstracking.inc.php");
  $getmapid=$_GET['mapid']+0;
  $query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
  //echo $query;
  //var_dump($MYSQLI_LINK);
  $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
  $r = mysqli_fetch_assoc($result);
  ?>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>IdeaBox -- <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  <script src="js/lib/moment-with-langs.js"></script>
  
  <script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  <script type="text/javascript" src="js/util.js"></script>

  
  <script type="text/javascript" src="js/lib/typeahead.bundle.js"></script>
  <script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.js'></script>
  


  <link href="css/typeahead.css" rel="stylesheet">
  
  <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link rel="stylesheet/less" type="text/css" href="styles/style.less" />

  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
 
  
  <script>
  $(document).ready(function(){
  $('#peopletable').height($( window ).height()-73-59);
  $('#peopletable').width($( window ).width());
  });
  </script>
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php 
    include('inc/nav.inc.php');
    ?>
    <iframe id="peopletable" src="http://107.170.218.111/" style="height:100%;width:100%;border:0px;margin-left:-15px;margin-top:-17px;margin-right:-30px;"></iframe>
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

