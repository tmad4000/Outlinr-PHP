   <!-- code mirror  -->
   <script src="js/lib/codemirror-4.2/lib/codemirror.js"></script>
   <script type="text/javascript" src="js/codemirror-xn-mode.js"></script>
   <script src="js/lib/codemirror-4.2/addon/hint/show-hint.js"></script>
   <script src="js/codemirror-xn-hint.js"></script>
   <script src="js/lib/codemirror-4.2/addon/display/placeholder.js"></script>
   <link rel="stylesheet" href="js/lib/codemirror-4.2/addon/hint/show-hint.css">
   <link rel="stylesheet" href="js/lib/codemirror-4.2/lib/codemirror.css">
   <link href="css/codemirror.css" rel="stylesheet">

   
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
 
  
  <script>
  $(document).ready(function(){
  $('#peopletable').height($( window ).height()-73-65);
  $('#peopletable').width($( window ).width());

<?php if(!isset($_SESSION['firstgraphload'])) {
  $_SESSION['firstgraphload']=true;
  echo 'location.reload();';
}
//#hack
?>
    

  });
  </script>
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php 
    include('inc/nav.inc.php');
    ?>
    <iframe id="peopletable" src="http://rhizi-hackathonprojects.herokuapp.com/" style="height:600px;width:100%;border:0px;margin-left:-15px;margin-top:0px;margin-right:-30px;"></iframe>
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

