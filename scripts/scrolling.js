(function(){
    var $document = $(document);
    var $body = $("body");
    $document.scroll(function(){
        var scrollOffset = parseInt($document.scrollTop());
        if(scrollOffset > 10)
            $body.addClass("scrolled");
        else
            $body.removeClass("scrolled");
    });
})();