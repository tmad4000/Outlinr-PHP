README

Roadmap to Code

index.1.7_suggestionbox.php
	Index for any single suggestion box thread

index.1.7_suggestionbox_ideamaps.php
	List of ideamaps

index.1.7_suggestionbox_inProgress.php
	Any single suggestion box's progress indication page


client.js // Sets up page structure, calls other js files functions
	document.ready
		Sets up textarea & textarea operations
	displayPosts()
		renders the list of ideas, right hand bar
	displayIdeaNames()
		renders individual ideas
	AJAX
		doUpvote
			upvotes a particular idea
		submitPostAndGetPosts()
			submits a post to db and gets posts
		getPosts()
			gets posts from db

EntryNodeTextViewModel.js // logic behind rendering any single idea text
	filter
		determines whether the string being searched for is in this particular idea text
	pushSplits (#Error)
		Adds splits to a certain split array
	setCritPts
		Collects the critical points from title, hashtag and bold in one array
	setBold
		pushes a sequence of characters to be in the bold splits
	clearBold
		clears all bold splits
	isASplitOpenOrClose
		checks whether a particular type of split is open or closed
	killHTML
		makes the text empty
	render
		builds idea text from critpts and plaintext



EntryNodeViewModel.js // logic behind rendering and operating on any single complete 
					  //idea with votes, progress etc
	show
		css property display visible
	hide
		css property display none
	filter
		determines whether this idea and its children are Matched to the search query or not
	render
		creates the idea element with the votes, progress and idea text and renders the text

util.js // utility functions to be used by other functions
	timeToString
		converts time to a String
	dateToString
		converts date to a String
	nl2br
		converts newline characters to <br> tags
	removeCommonWords
		removes common words from a given string (and returns this string)
	findTitleEnd
		finds the cutoff of a title, either -- or by length
	extractIdeaName
		gets the Title of any given ideaText
	replaceIdeaName
		replaces the Title of any given ideaText
	regexMatchOffset
		returns the startpos and length of each regex match for a given startpos in the string
	extractTags
		matches all hashtags in a given ideaText
	replaceTags
		never called
	processIdea
		never called
	linkifyHashtags
		makes pressing hashtags enter their contents into search box & filter on it


Issues

	- viewDomE is not actually connected to the html page, we can use a getter method to select the jquery object based on the parents pid.

We have 554 Pixels in width used up without considering the ideas innerwidth