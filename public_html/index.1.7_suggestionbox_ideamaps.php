<?php
require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>GestaltBox -- Ideas</title>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>GestaltBox -- <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  <script src="js/lib/moment-with-langs.js"></script>
  <script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="js/client_ideamaps.js"></script>

  
  <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link rel="stylesheet/less" type="text/css" href="styles/style.less" />

  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
   
    <style type='text/css'>
      #currentposts {
        margin-top:20px;
      }
      .navbar {
        letter-spacing: 1px !important;
      }
        .table td {
            line-height:auto;   
            padding: 5px 8px 12px 0;
        
        }     
        
        table.subrow {
                border:none;
                width:100%;
        }

        table.subrow td {
                border:none;
        }
        
        ul.progbarlist {
                list-style-type: none;
                padding-top:0
                
        }
        
        ul.progbarlist table{
                padding-top:5px;                
                margin-bottom:0;
                
        }
        
        #currentposts > ul.progbarlist {
                padding-left:0;
                margin-left:0             
        }

      </style>
</head>
<body>
  <div class="container-fluid outermost">
 
  <?php 
  include('inc/nav.inc.php');
  ?>

    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12">
            <form id="postform">
              <div class="input-append">
                <textarea class="span12" id="newpost" placeholder="Create a suggestion box"></textarea>
              </div>
            </form>
          </div>
        </div>
        <!--<div class="row">
          <div class="col-sm-12">
            <div id="tableHeaderDiv">
              <div id="numResults"></div>
              <div id="filterBy">
                  <a id='sortByDate' class="active">New</a>
                  <a id="sortByUpvotes">Top</a>
                  <a id='sortByStatus'>Status</a>
              </div>
            </div>
          </div>
        </div>-->
        <div class="row">
          <div class="col-sm-12">
            <div id="currentposts">
              <center>Loading...</center>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="sidebar-nav-fixed navbar-inner">
          <ul class="nav nav-list">
            <li class="nav-header">Categories (#)</li>
            <ul id="idea-hashtags" class="ideatags">
            </ul>
            <li class="nav-header">People (~)</li>
            <ul id="people-list" class="peopletags">
            </ul>
            <li class="nav-header">All Ideas</li>
            <ul id="ideanames" class="">
            </ul>
          </ul>
        </div><!--/.well -->
      </div><!--/span-->
    </div><!--/row-->
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>