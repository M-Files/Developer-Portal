$(document).ready(function(){

    var $ul = $("<ul></ul>").attr("id", "in-page-nav");
    var $headings = $("h1, h2, h3", $("article.page"));
    
    $headings.each(function(i, o)
    {
        var $heading = $(this);
        $ul.append($("<li></li>")
            .addClass($heading.get(0).nodeName.toLowerCase())
            .append($("<a></a>").attr("href", "#" + $heading.attr("id")).text($heading.text())));
        
    });

    $("BODY").append($ul);

});
