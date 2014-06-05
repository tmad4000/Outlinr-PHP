Outlinr-PHP
===========


ProjectNet
==========
To configure:
Demo URL: http://instadefine.com/IdeaOverflow/projectnet/public_html/index.1.7_suggestionbox.php?mapid=226
1. In public_html/inc:
copy private.inc.php.sample to private.inc.php
copy remoteinfo.inc.php.sample to remoteinfo.inc.php

Adjust login information appropriately. 
To authenticate Berkeley students: calnetlogin.inc.php is located in public_html/inc
Include from files in public_html directory or otherwise includes need to be adjusted

2. To test authentication, go to public_html/index_test.php

3. To use extant database structure: Import SQL dump from root directory: jcole_ideaoverflow2_ma backup5-27-14.sql



===========
Demo URLs include:
http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/pika/public_html/index.1.7_suggestionbox_ideamaps.php

Example:
http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/pika/public_html/index.1.7_suggestionbox.php?mapid=117
and 
(dashboard) http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/pika/public_html/index.1.7_suggestionbox_m.php?mapid=117

Using typeahead v0.10.2
 If ever updating, look for the comment "/* WARNING: This is hackery abusing non-public Typeahead APIs */"
 That exists as a hack to get the autocomplete dropdown showing just on focus, without any additional input