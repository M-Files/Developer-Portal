$(function () {
    $('iframe#webcontent').attr('src', getDefaultTopic());
});

function getDefaultTopic() {
    var qs = window.location.search;
    if (qs.length > 0 && !qs.startsWith('?utm_')) {
        return qs.substring(1) + window.location.hash;
    } else if (window.location.hash.length > 0) {
        return window.location.hash.substring(1);
    } else {
        return defaultTopic;
    }
} 

if (isDefaultLayoutEnabled) {
    loadDefaultLayout();
}
else {

    // Loading in respsonsive mode, conditionally load responsive or desktop layout
    switch (getDeviceType()) {

        case "TABLET":
        case "MOBILE":
            Modernizr.load([{
                load: ['stylesheets/responsive.webframe.css',
                        'script/responsive.webframe.js',
                        'script/jquery.animate-enhanced.js'],
                complete: function () {
                    onResponsiveWebFrameLoadComplete();
                }
            }]);
            break;

        case "DESKTOP":
            loadDefaultLayout();
            break;
    }

}

function loadDefaultLayout() {

    Modernizr.load([{
        load: ['stylesheets/jquery.layout.css',
                'script/jquery.layout.min.js',
                'script/webframe.js'],
        complete: function () {
            onDesktopWebFrameLoadComplete();
        }
    }]);

}

// 27.5.2016 Antti A.: Listen for hash changes and change the page in the content frame once a hash change occurs. 
// The frame needs to be removed and re-created every time the hash portion of the URL changes and the a new content page is opened to avoid duplicate entries in the browser history
$(window).on('hashchange', function() {	
	var	hash = window.location.href.indexOf("#");
	if (hash >= 0) {		
		// remove the content iframe and re-add it on every content page load
		$('#webcontent').remove();
		$('#busy').after('<iframe id="webcontent" name="webcontent" frameborder="0"></iframe>');
		$('#webcontent').addClass('ui-layout-center ui-layout-pane ui-layout-pane-center');
		$('#webcontent').css({
			'padding': '0px',
			'position': 'absolute',
			'margin': '0px',
			'left': '356px',
			'right': '0px',
			'top': '0px',
			'bottom': '0px',
			'z-index': '0',
			'display': 'block',
			'visibility': 'visible'
		});
		$('#webcontent').attr('src', getDefaultTopic());
		//fix dimensions
		$('#webcontent').height(getClientSize().height + 'px');
		$('#webcontent').width(getClientSize().width - $('#webnavbar').width() + 'px');
		// synchronize TOC
	}
});


// 27.5.2016 Antti A.: Fix frame dimensions when window is resized.
$(window).resize(function() {
	resizeIframes(true);
	$('#webcontent').width(getClientSize().width - $('#webnavbar').width() + 'px');
});