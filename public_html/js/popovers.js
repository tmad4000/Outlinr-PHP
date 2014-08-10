function sortByPopover(){
    switch(filterToggle){
        case 'Hot':
            return "<ul><li><a id='sort-by-hot' class='selected'>Hot</a></li><li><a id='sort-by-top'>Top</a></li><li><a id='sort-by-date'>New</a></li><li><a id='sort-by-progress'>Progress</a></li></ul>"; 
            break;
        case 'Date':
            return "<ul><li><a id='sort-by-hot'>Hot</a></li><li><a id='sort-by-top'>Top</a></li><li><a id='sort-by-date' class='selected'>New</a></li><li><a id='sort-by-progress'>Progress</a></li></ul>"; 
            break; 
        case 'Upvotes':
            return "<ul><li><a id='sort-by-hot'>Hot</a></li><li><a id='sort-by-top' class='selected'>Top</a></li><li><a id='sort-by-date'>New</a></li><li><a id='sort-by-progress'>Progress</a></li></ul>"; 
            break; 
        case 'Status':
            return "<ul><li><a id='sort-by-hot'>Hot</a></li><li><a id='sort-by-top'>Top</a></li><li><a id='sort-by-date'>New</a></li><li><a id='sort-by-progress' class='selected'>Progress</a></li></ul>"; 
            break;
        default: 
            return "<ul><li><a id='sort-by-hot'>Hot</a></li><li><a id='sort-by-top'>Top</a></li><li><a id='sort-by-date'>New</a></li><li><a id='sort-by-progress'>Progress</a></li></ul>"; 
    }
}

function joinByPopover(){
    return "<ul><li><a href=''>Earth</a></li><li><a href='' class='selected'>Hackathons</a></li><li><a href=''>At&t Houston</a></li><li><a href=''>Me</a></li></ul>";
}

function typeByPopover(){
    return "<ul><li><a href='' class='selected'>All</a></li><li><a href=''>iOS</a></li><li><a href=''>Android</a></li><li><a href=''>Web Dev</a></li><li><a href=''>Hardware</a></li></ul>"
}

function scopePopover(){
    return "<ul><li><a href=''>Private</a></li><li><a href=''>Public</a></li><li><a href=''>All</a></li></ul>";
}