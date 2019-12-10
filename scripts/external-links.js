(function($){

    // Create the "external link" icon.
    var $externalLink = $("<span class='iconify' data-icon='mdi:open-in-new'></span>");

    // Create the "github" icon.
    var $githubLink = $("<span class='iconify' data-icon='mdi:github-circle'></span>");

    // Add the "external" class to all external links.
    var $externalLinks = $("a", "article.page article")
        .filter(function(){
            return this.hostname && this.hostname !== location.hostname;
		})
		.addClass("external")
        .attr("rel", "external noopener")
		.attr("target", "_blank");
    
    // Add the github icon.
    $externalLinks.filter(function(){ return this.hostname == "github.com" })
        .prepend($githubLink.clone());
    
    // Add the other external icon.
    $externalLinks.filter(function(){ return this.hostname != "github.com" })
        .append($externalLink.clone());
})(jQuery);