var baseTitle = document.title;

if (isPostMessageEnabled()) {
    addMessageListener(commonFrameMessageHandler);
}

/**
* @param {Object} event
**/
function commonFrameMessageHandler(event) {
    var message = getMessage(event.data);

    switch (message.messageType) {
        case "loaded":
            contentLoaded(message.messageData);
            // Forward message to webnav
            try {
                document.getElementById('webnavbar').contentWindow.postMessage(message.messageType + "|" + message.messageData, "*");
            } catch (ex) {

            }
            break;
        case "updatePageTitle":
            updatePageTitle(message.messageData);
            break;
        case "quicksearch":
        case "searchHighlightComplete":
            // Pass to content window
            contentFrame().postMessage(message.messageType + "|" + message.messageData, "*");
            break;
    }
}

/**
* @param {string} pageTitle
**/
function contentLoaded(url) {
    updateLocation(url);

    if (typeof contentLoadedImplementation == 'function') {
        contentLoadedImplementation();
    }
}

function updateLocation(url) {

    var pageName = url.substring(url.lastIndexOf('/') + 1);
    if ('#' + pageName != document.location.hash) {
        if (window.history.replaceState) {
            try {
                window.history.replaceState('', '', '#' + pageName);
            } catch (ex) {
                // May fail with security exception on local file system
            }
        } else {
            window.location.replace('#' + pageName);
        }
    }

}

/**
* @param {string} pageTitle
**/
function updatePageTitle(pageTitle) {

    document.title = baseTitle + ' - ' + pageTitle;

}

function getCurrentPageName() {

    if (window.location.hash != "") {
        return window.location.hash.substring(1);
    }
    else {
        return getDefaultTopic();
    }

}
if (isPostMessageEnabled()) {
    addMessageListener(responsiveFrameMessageHandler);
}

/**
* @param {Object} event
**/
function responsiveFrameMessageHandler(event) {

    var message = getMessage(event.data);

    switch (message.messageType) {
        case "openNavigationPane":
            openNavigationPane(message.messageData);
            break;
        case "closeNavigationPane":
            closeNavigationPane();
            break;
        case "navigate":
            navigate(message.messageData);
            break;
        case "insertRemoveHighlighting":
            document.getElementById('webcontent').contentWindow.postMessage("insertRemoveHighlighting", "*");
            break;
    }

}

/**
* @param {string} messageData
**/
function openNavigationPane(messageData) {

    isIframeResizeTimerDisabled = true;

    // Activate the desired item in the accordion
    document.getElementById('webnavbar').contentWindow.postMessage("select|" + messageData, "*");

    switch (getDeviceType()) {
        case "MOBILE":
            $("iframe#webnavbar").css('width', '100%');
            break;
        case "TABLET":
            $("iframe#webnavbar").css('width', '50%');
            $("iframe#webnavbar").data('widthDivisor', 0.5);
            fixSubPixelWidth($("iframe#webnavbar"));
            break;
    }

    // Resize webnav and webcontent to their content height
    resizeIframes(true);
    // Show the gray overlay
    $("#busy").show();
    // Bring in the navbar
    $("iframe#webnavbar").css('visibility', 'visible');
    $("iframe#webnavbar").animate({ left: '0' }, 600, 'swing', function () { isIframeResizeTimerDisabled = false });

}

function closeNavigationPane() {
    if ($("iframe#webnavbar").css('left') == '0px') {
        isIframeResizeTimerDisabled = true;

        // Close the navbar
        $('iframe#webnavbar').animate({ left: "-" + $('iframe#webnavbar').css('width') }, 400, 'swing', function () {
            $("iframe#webnavbar").css('visibility', 'hidden');
            // Remove the gray overlay
            $("#busy").hide();
            // Resize the navbar back to default - window height
            $("iframe#webnavbar").height($(window).height());
            $("iframe#webnavbar").data('lastHeight', $(window).height());
            // Tell the navbar to shrink it's frame sizes
            document.getElementById('webnavbar').contentWindow.postMessage("shrinkIframes", "*");
            isIframeResizeTimerDisabled = false;
        });
    }

}

/**
* @param {string} messageData
**/
function navigate(messageData) {

    // Get the next / previous page from the toc
    if (messageData == "getNextTopic" || messageData == "getPreviousTopic") {
        document.getElementById('webnavbar').contentWindow.postMessage(messageData + "|" +
                                                                        getCurrentPageName(), "*");
    }
    else {
        // Navigate to specific page
        if ($('#webcontent').attr('src') != messageData) {
            // Default content frame height back to the window height - to stop the content frame
            //  growing to the largest doc size over time
            $('#webcontent').height($(window).height());
            $('#webcontent').attr('src', messageData);
        }
        closeNavigationPane();
    }

}

function contentLoadedImplementation() {

    document.getElementById('webnavbar').contentWindow.postMessage('syncToC|' + getCurrentPageName(), '*');
    document.getElementById('webcontent').contentWindow.postMessage('insertNavigationHeader', '*');

}
window['contentLoadedImplementation'] = contentLoadedImplementation;

function onResponsiveWebFrameLoadComplete() {

    $("iframe#webnavbar").css("left", -$(window).width()).css("display", "block");
    // Call contentLoadedImplementation now as the function won't be defined in the message handler until the specific
    // script has finished loading
    contentLoadedImplementation();

    // Resize the iframes and set a timer to keep them sized
    resizeIframes();
    setInterval(function () {
        if (!isIframeResizeTimerDisabled) {
            var maxHeight = resizeIframes();
            if (maxHeight > 0 && maxHeight != $('body').height()) {
                $('body').height(maxHeight);
            }
        }
    }, 500);

    setTimeout(function () {
        $('html').removeClass('loading');
        $('html').addClass('loaded');
    }, 1);
}
window['onResponsiveWebFrameLoadComplete'] = onResponsiveWebFrameLoadComplete;

$(function () {
    $(window).resize(function () {
        if ($("iframe#webnavbar").css('left') != '0px') {
            $("iframe#webnavbar").css("left", -$(window).width());
        }
        fixSubPixelWidth($("iframe#webnavbar"));
    });


    // Scroll back to the top of page on a new page load
    $('iframe#webcontent').load(function () {
        $('body').scrollTop(0);
    });
});

/**
* @param {Object} jQuery selector of the element or elements to fix the width for
**/
function fixSubPixelWidth(element) {
    element.width(Math.floor($(window).width() * element.data('widthDivisor')));
}