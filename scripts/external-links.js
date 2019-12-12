(function($){
    // Add the "external" class to all external links.
    $("a", "article.page article")
        .filter(function(){
            return this.hostname && this.hostname !== location.hostname;
		})
		.addClass("external")
        .attr("rel", "external noopener")
		.attr("target", "_blank");
})(jQuery);