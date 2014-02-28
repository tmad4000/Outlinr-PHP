<?php
require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>GestaltBox -- Ideas</title>
  
  
    
    <!--      <link rel="stylesheet" type="text/css" href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css">
          <link rel="stylesheet" type="text/css" href="http://twitter.github.io/bootstrap/1.4.0/bootstrap.min.css">
    -->
      <link href="js/lib/bootstrap-combined.min.css" rel="stylesheet">
      <link href="js/lib/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
      
    <style type='text/css'>
    body {
        padding-bottom: 40px;
        padding-top: 60px;
    }
    .navbar {
      letter-spacing: 1px !important;
    }
    
    .sidebar-nav-fixed {
        padding: 9px 0;
        position:fixed;
        right:20px;
        top:40px;
        width:250px;
    }
    
    .row-fluid > .span-fixed-sidebar {
        margin-right: 290px;
    }
    
    #ideanames, #idea-hashtags {
    overflow:auto;
    max-height:300px;
    }
    
    #ideanames li{
    line-height: 14px;
    padding-bottom: 6px;
    }
    
     ul#idea-hashtags li {
     display:inline;
     margin:1px
     }
    
    .hero-unit-light {
        padding: 60px;
      margin-bottom: 30px;
     /* font-size: 18px;
      font-weight: 200;
      line-height: 30px;*/
      color: inherit;
      /*background-color: #eeeeee;*/
      -webkit-border-radius: 6px;
         -moz-border-radius: 6px;
              border-radius: 6px;
    
    }
    
    .table td {
        line-height:auto;
        
        padding: 5px 8px 12px 0;
    
    }
    
    
    td.progbaruser {
        text-align:right;
        padding-right:20px;
    }
    
    .metric {
        font-size:10px;
        color:#AAA
    }
    .progress {
        margin-bottom:0px
    }
    /*<!-- **PROGBAR** -->*/
    /*@import url('http://twitter.github.com/bootstrap/assets/css/bootstrap.css');*/
    
    .container {
    /*    margin-top: 5px;*/
        width: 400px;
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
	
	
	
td.ideaTxt {
	/*width:100%;*/
}



ul.entryNode {
	list-style-type: none;
	padding-top:0
	
}

ul.entrylist {
	list-style-type: none;
	padding-top:0
	
}

ul.entryNode table{
	padding-top:5px;		
	margin-bottom:0;
	
}

ul.entryNode td {
	
	
}

td.uid {
	text-align:right;
}

#currentposts > ul.entrylist {

	padding-left:0;
	margin-left:0;
	
}
#currentposts > ul.entryNode {

	padding-left:0;
	margin-left:0;
	
}
#currentposts > ul.entryNode > li > ul.entrylist {

	padding-left:0;
	margin-left:0;
	
}

      </style>
      
    
      
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>    
        
    <!--        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />-->
    <script type="text/javascript" src="js/client_inProgress.js"></script>
        
    <script type='text/javascript'>//<![CDATA[ 
    /*window.onload=function(){
        localStorage.setItem("ideaNames",'[\
        {\
            "name": "CuriosityThread",\
            "description": "asdfasdf"\
        },\
        {\
            "name": "PRIVMSG",\
            "description": "randomURI"\
        }\
    ]');
    
     displayIdeaNames();
     }*/
    //]]>  
    /*<!-- **PROGBAR** -->*/
    /*
    var progress = setInterval(function() {
        var $bar = $('.bar');
        
        if ($bar.width()==400) {
            clearInterval(progress);
            $('.progress').removeClass('active');
        } else {
            $bar.width($bar.width()+40);
        }
        $bar.text($bar.width()/4 + "%");
    }, 800);
    */
    
    
    </script>

    
    
</head>
<body>
  <?php 
  	include('inc/nav.inc.php');
	if(0) {
	?>
  <div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container-fluid">

      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      
      <a class="brand" href="#"><!--<img src="http://www.dpcma.org/Portals/1/massachusetts-seal.gif" height="20" width="20">--> &nbsp; Outline</a>
      <div class="nav-collapse">
        <ul class="nav">


          <li class="active"><a href="index.1.7_suggestionbox.php">IdeaMap</a></li>
          <li><a href="index.1.7_suggestionbox_inProgress.php">InProgress</a></li>
          <li><a href="index.1.7_suggestionbox_proposals.php">Proposals</a></li>
          
         
        </ul>
        <p class="navbar-text pull-right">Logged in as <a href="#">username</a></p>
      </div><!--/.nav-collapse -->

    </div>
  </div>
</div>
<?php } ?>

<div class="container-fluid">
  <div class="row-fluid row">
    <div class="">
      <div class="well sidebar-nav-fixed navbar-inner">
        <ul class="nav nav-list">

          <li class="nav-header">Ideas</li>
          <ul id="ideanames" class="">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
          </ul>
          <li class="nav-header">Categories</li>

          <ul id="idea-hashtags" class="">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
          </ul>
<!--
          <li class="nav-header">Sidebar</li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>-->
        </ul>
      </div><!--/.well -->
    </div><!--/span-->

    <div class="span9 span-fixed-sidebar">
      <div class="hero-unit-light" style="padding-top:0">

	<!-- **PROGBAR** --><!--
      <div class="container">
        <div class="progress progress-striped active">
            <div class="bar" style="width: 0%;"></div>
        </div>
	  </div>-->
      <!--<form id="postform">
        <div class="input-append" style="width:100%">
          <textarea class="span12" placeholder="Enter your own cool project idea(s) here!" id="newpost" ></textarea>
          <input class="btn" type="submit"></input>
        </div>
      </form>
      -->
      <div id="currentposts"></div>
      
      </div>
      

  <hr>

  <footer>
    <p>Created by <a target="_blank" href="mailto:jcole@mit.edu">Jacob Cole</a> and <a target="_blank" href="mailto:david.furlong@stcatz.ox.ac.uk">David Furlong</a></p>
  </footer>

</div><!--/.fluid-container-->
  
</body>


</html>

