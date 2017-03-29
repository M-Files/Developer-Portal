(function($){
    // Create the "external link" icon.
    var $externalLink = $("<i class='zmdi zmdi-open-in-new' style='padding-left: 5px;'></i>");
    // Add the "external" class to all external links.
    $("article.page a")
        .filter(function(){
            return this.hostname && this.hostname !== location.hostname;
        })
        .attr("rel", "external")
        .attr("target", "_blank")
        .append($externalLink.clone());
})(jQuery);