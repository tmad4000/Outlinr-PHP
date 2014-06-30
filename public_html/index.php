<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaJoin</title>
  <?php include('inc/local.php'); ?>
  <script type="text/javascript" src="js/client_ideamaps.js"></script>

  <link rel="stylesheet/less" type="text/css" href="styles/index.less" />
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
</head>
<body>
  <div class="container-fluid">
    <div class="row margin-vertical">
      <div class="col-sm-6">
        <div id="landingsplash">IdeaJoin</div>
      </div>
      <div class="col-sm-6 right middle margin-vertical">
        <a href="create.php" class="link-button">Create New</a>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div id="marketing">
          <h2>An ideation tool for your community. </h2>
          <h5>Vote on ideas, comment, connect them and report on progress</h5>
          <h2>It's Free and really easy to start</h2>
          <h5>Just enter the name of your box and hit enter!</h5>
        </div>
      </div>
    </div>
    <div class="row" id="textfield">
      <div class="col-sm-12">

        <form id="postform">
          <div class="input-append">
            <input type="text" class="span12" id="newpost" placeholder="Search idea boxes"/>
          </div>
        </form>
      </div>
    </div>
    <div class="row full-width" id="ideamaps">
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