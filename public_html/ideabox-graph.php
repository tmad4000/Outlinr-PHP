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
    $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
    $r = mysqli_fetch_assoc($result);
  ?>
  <title>IdeaJoin -- <?= strpos($_SERVER['PHP_SELF'],"ideabox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  <?php include('inc/includes.php'); ?>
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
  <script>
    $(document).ready(function(){
      $('#peopletable').height($( window ).height()-73-65);
      $('#peopletable').width($( window ).width());
    });
  </script>
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php 
    include('inc/nav.inc.php');
    ?>
    <iframe id="peopletable" src="http://rhizi-hackathonprojects.herokuapp.com/" style="height:100%;width:100%;border:0px;margin-left:-15px;margin-top:0px;margin-right:-30px;"></iframe>
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

