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
  

  <script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script> 
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>   
  <script type="text/javascript" src="js/client_admin.js"></script>
  <link href="css/typeahead.css" rel="stylesheet">
  
  <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link rel="stylesheet/less" type="text/css" href="styles/style.less" />

  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  


<script src="http://www.d3plus.org/js/d3.js"></script>
<script src="http://www.d3plus.org/js/d3plus.js"></script> 
  
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
  <div class="container-fluid outermost" > 
    <?php 
    include('inc/nav.inc.php');
    ?>
<div id="viz" style="height:600px"></div>

<script>

  // var sample_data = [
  //   {"name": "alpha", "size": 10},
  //   {"name": "beta", "size": 12},
  //   {"name": "gamma", "size": 30},
  //   {"name": "delta", "size": 26},
  //   {"name": "epsilon", "size": 12},
  //   {"name": "zeta", "size": 26},
  //   {"name": "theta", "size": 11},
  //   {"name": "eta", "size": 24}
  // ]

  // var connections = [
  //   {"source": "alpha", "target": "beta"},
  //   {"source": "alpha", "target": "gamma"},
  //   {"source": "beta", "target": "delta"},
  //   {"source": "beta", "target": "epsilon"},
  //   {"source": "zeta", "target": "gamma"},
  //   {"source": "theta", "target": "gamma"},
  //   {"source": "eta", "target": "gamma"}
  // ]

  var data = $.parseJSON(localStorage.getItem("posts"));
  var relations_orig=data['links'];
  var relations=[];

  var nodes=data['flatPosts'];
  var sample_data = [
    {"prim_key":"778", "name": "alpha", "size": 10},
    {"prim_key":"781", "name": "beta", "size": 12},
    {"prim_key":"3", "name": "gamma", "size": 30},
    {"prim_key":"4", "name": "delta", "size": 26},
    {"prim_key":"5", "name": "epsilon", "size": 12},
    
  ]

  for(i=0;i<relations_orig.length;i++) {
      relations[i]={};
      relations[i]['source']=""+relations_orig[i]['source']
      relations[i]['target']=""+relations_orig[i]['target']
    // console.log(relations[i]['source'],relations[i]['target'])
    //   relations[i]['source']=relations_orig[i]['source']['prim_key']
    //   relations[i]['target']=relations_orig[i]['target']['prim_key']
    }

  for(i=0;i<nodes.length;i++) {
      
      nodes[i]['name']=""+nodes[i]['title']
    }

relations=relations.slice(0,60)

console.log(relations[0]['source'],relations[0]['target'])

  var visualization = d3plus.viz()
    .container("#viz")
    .type("network")
    .data(nodes)
    .edges(relations)
    // .size("size")
    .id("pid")
    .text("title")
    .tooltip("body")
    .draw();

</script>




    <!-- <iframe id="peopletable" src="http://rhizi-hackathonprojects.herokuapp.com/" style="height:100%;width:100%;border:0px;margin-left:-15px;margin-top:0px;margin-right:-30px;"></iframe> -->
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

