<?php require_once('../config.inc.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <?php include('inc/local.php'); ?>
  <script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>
  <script type="text/javascript" src="js/ideafeed.js"></script>
</head>
<body>
  <div class="container-fluid outermost">
    <?php include('inc/nav.inc.php'); ?>
    <div class="row">
      <div class="col-sm-3">
        <div class="row">
          <div class="col-sm-12">
            <form id="postform">
              <textarea class="span12" placeholder="Add an Idea" id="newpost" ></textarea>
              <div class="right">
                <button id="" class="btn btn-secondary">
                  <i class='fa fa-filter'></i>
                </button>
                <button type="submit" id="" class="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="sidebar-nav-fixed navbar-inner">
              <ul class="nav nav-list">
                <li class="nav-header">Labels</li>
                <ul id="idea-hashtags" class="tags">
                </ul>
                <li class="nav-header">People</li>
                <ul id="people-list" class="tags">
                </ul>
            </ul>
          </div><!--/.well -->
        </div>
      </div>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 ml">
            <div id="filterBy">
            Show me <button type="button" id="type-by" class="filter-button" data-container="body" data-toggle="popover" data-placement="bottom" data-content="<ul><li><a href='' class='selected'>All</a></li><li><a href=''>iOS</a></li><li><a href=''>Android</a></li><li><a href=''>Web Dev</a></li><li><a href=''>Hardware</a></li></ul>">
              All <i class='fa-chevron-down fa'></i>
            </button> ideas in <button type="button" id="join-by" class="filter-button" data-container="body" data-toggle="popover" data-placement="bottom" data-content="<ul><li><a href=''>Earth</a></li><li><a href='' class='selected'>Hackathons</a></li><li><a href=''>At&t Houston</a></li></ul>">
              Hackathons <i class='fa-chevron-down fa'></i>
            </button> sorted by <button type="button" id="sort-by" class="filter-button" data-container="body" data-toggle="popover" data-placement="bottom" data-content="<ul><li><a href='' class='selected'>Hot</a></li><li><a href=''>Top</a></li><li><a href=''>New</a></li><li><a href=''>Progress</a></li></ul>">
              Hot <i class='fa-chevron-down fa'></i>
            </button>
            </div>
            <!--
            <div id="filterBy">
              <a id='sortByHot' class="active"><i class="ion-fireball"></i><span>Hot</span></a>
              <a id='sortByDate'><i class="ion-ios7-lightbulb-outline"></i><span>New</span></a>
              <a id="sortByUpvotes"><i class="ion-ios7-star-outline"></i><span>Top</span></a>
              <a id='sortByStatus'><i class="ion-ios7-checkmark-outline"></i><span>Progress</span></a>
            </div>
            -->
          </div>
        </div>
        <div class="row cp">
          <div class="col-sm-12">
            <div id="currentposts">
              <div id="numResults"></div>
              <center><i class="ion-loading-c"></i></center>
            </div>
          </div>
        </div>
      </div>
    </div><!--/row-->
  </div><!--/.fluid-container-->
  <?php include('inc/footer.inc.php'); ?>
</body>
</html>