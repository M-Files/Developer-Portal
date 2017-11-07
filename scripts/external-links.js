(function($){

    // Create the "external link" icon.
    var $externalLink = $("<i class='zmdi zmdi-open-in-new'></i>");

    // Create the "github" icon.
    var $githubLink = $("<i class='zmdi zmdi-github'></i>");

    // Add the "external" class to all external links.
    var $externalLinks = $("a", "article.page article")
        .filter(function(){
            return this.hostname && this.hostname !== location.hostname;
        })
        .attr("rel", "external")
		.attr("target", "_blank");
    
    // Add the github icon.
    $externalLinks.filter(function(){ return this.hostname == "github.com" })
        .prepend($githubLink.clone());
    
    // Add the other external icon.
    $externalLinks.filter(function(){ return this.hostname != "github.com" })
        .append($externalLink.clone());
})(jQuery);