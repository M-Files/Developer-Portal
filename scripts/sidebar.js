(function(){
    var $document = $(document);
    var $body = $("body");
    $body.click(function(){
        $body.removeClass("sidebar-expanded");
    })
    $("#hamburger").click(function(){
        $body.toggleClass("sidebar-expanded");
        return false;
    });
})();