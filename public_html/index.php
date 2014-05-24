<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaBox</title>
  <?php include('inc/includes.php'); ?>
  <script type="text/javascript" src="js/client_ideamaps.js"></script>
  <link rel="stylesheet/less" type="text/css" href="styles/index.less" />
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
</head>
<body>
  <div class="container-fluid outermost">
    <div class="row" id="splash">
      <div class="col-sm-12">
        <div id="landingsplash">
          IdeaBox
        </div>
        <div id="marketing">
          <h2>An ideation tool for your community. </h1>
          <h5>Vote on ideas, comment, connect them and report on progress</h5>
          <h2>It's Free and really easy to setup</h1>
          <h5>Just enter the name of your box and hit enter!</h5>
        </div>
      </div>
    </div>
    <div class="row" id="textfield">
      <div class="col-sm-12">
        <form id="postform">
          <div class="input-append">
            <input type="text" class="span12" id="newpost" placeholder="Create or search idea boxes"/>
          </div>
        </form>
      </div>
    </div>
    <div class="row" id="ideamaps">
      <div class="col-sm-12">
        <div id="currentposts">
          <center><i class="ion-loading-c"></i></center>
        </div>
      </div>
    </div>
  </div>
  <footer>
  <a href="mailto:tmad4000@gmail.com">Contact</a>
  </footer>
</body>
</html>