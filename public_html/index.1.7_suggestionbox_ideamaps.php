<?php
require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>IdeaBox</title>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.4.1/css/ionicons.min.css">
  
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <script src="js/lib/moment-with-langs.js"></script>
  <script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  <script type="text/javascript" src="js/util.js"></script>
  <script type="text/javascript" src="js/client_ideamaps.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans+SC:100' rel='stylesheet' type='text/css'>

  
  <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link rel="stylesheet/less" type="text/css" href="styles/style.less" />

  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
   
    <style type='text/css'>
      body {

      }
      .row {
        margin:0px;
      }
      #ideamaps {
        background:url('images/tess.svg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        margin:0px;
        z-index:-1;
      }
      body::after {
        content: "";
        opacity: 0.1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;  
        /*background: rgba(255,255,255,1);
        background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 92%, rgba(237,237,237,1) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(92%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 92%, rgba(237,237,237,1) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 92%, rgba(237,237,237,1) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 92%, rgba(237,237,237,1) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 92%, rgba(237,237,237,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
        */
        background: url('http://farm8.staticflickr.com/7045/6974288971_9dffd329e8_o.jpg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

      }
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

        #landingsplash {
          font-size:100pt;
          text-align: center;
          font-weight: 100;
          text-shadow:0px -1px 0px #fff;
          font-family:"Alegreya Sans SC","Roboto","HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue","Avenir", Helvetica, Arial, "Lucida Grande", sans-serif; 
          
        }

        input[type="text"]#newpost {
          border-radius:50px;
          width:100%;
          padding:10px 30px;
          font-size:16pt;
          line-height: normal;
          letter-spacing: 1px;
        }

        #currentposts {
          margin-left: 0px;
          margin-top:90px;
          z-index:20;
        }
        #currentposts a{
          color:white;
          font-size:16pt;
        }
        #currentposts a:hover {
          text-decoration: none;
          text-shadow: 0 0 5px #efefef;
        }

        .row {
          padding:0px 150px;
        }
        .container-fluid {
          margin:0px;
          padding:0px;
        }
        footer {
          background:transparent;
          outline:none !important;
          border-top:0px !important;
          border:0px !important;
          box-shadow:none !important; 
          color:white;
          font-size:20pt;
        }
        footer a {
          margin:0px 50px;
          color:white;
        }
        footer a:hover{
          text-decoration: none;
          text-shadow: 0 0 5px #efefef;
        }
        #newpost {
        }
        #newpost:focus {
        }
        #textfield {
          position: relative;
          top:95px;
          z-index:50;

        }
        ul.progbarlist {
          padding:0px;
        }
      </style>

</head>
<body>
  <div class="container-fluid outermost">
    <div class="row" id="splash">
      <div class="col-sm-12">
        <div id="landingsplash">
          IdeaBox<span style="font-size:16pt">Beta</span>
        </div>
        <div id="marketing">
          <h1 style="margin-top:0px;padding-top:0px;">An ideation tool for your community. </h1>
          <h5>Vote on ideas, comment, connect them and report on progress</h5>
          <h1>It's Free and really easy to setup</h1>
          <h5>Just enter the name of your box and hit enter!</h5>
          <h1>Discover the power of collaborative ideation</h1>
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
          <center>Loading...</center>
        </div>
      </div>
    </div>
  </div>
  <footer>
  <a href="mailto:tmad4000@gmail.com">Contact</a>
  </footer>
</body>
</html>