$(function () {

    $(window).resize(function () {
        addCloseButtonChevrons();
    });

    function addCloseButtonChevrons() {
        var topWindowHeight = 0;
        try {
            topWindowHeight = $(window.top).height();
        } catch (ex) {
            topWindowHeight = $(window).height();
        }
        var closePaneHeight = $('div#closepane').height();

        $('div#closepane > i.image').remove();
        for (var i = topWindowHeight / 2; i < closePaneHeight ; i += topWindowHeight) {
            var image = $('<i class="image"></i>');
            image.css('top', i + "px");
            image.appendTo('div#closepane');
        }
    }

    $('div#closepane').on("click", "a.btn, i.image", function (event) {
        event.preventDefault();
        var webContentFrame = window.parent;
        webContentFrame.postMessage('closeNavigationPane', "*");
    });

    // Resize the iframes and set a timer to keep them sized
    resizeIframes();
    setInterval(function () {
        if (!isIframeResizeTimerDisabled) {
            resizeIframes();
        }
    }, 500);

});