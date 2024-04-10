$(document).ready(function()
{
    $(function(Query) {
        var query = new Query(),
            site = location.protocol + "//" + location.host;

        query.setFromURL('query');
        var q = query.get();
        $("input#query").val(q);
        if(!q || !q.length == 0)
            return;
        
    var data = query.getData();

    var searchIndex,
            results,
            $resultsCount = $('.search-results-count'),
            $results = $('.search-results'),
            totalScore = 0,
            percentOfTotal;

        // set up the allowable fields and the content from our json.
        searchIndex = lunr(function() {
            this.field('title');
            this.field('category');
            this.field('content');
            this.ref('url');
            this.field('date');
            data.forEach(function(doc){
            this.add(doc);
            }, this);
        });

        // search for the query and store the results as an array
        results = searchIndex.search(q);
        
        // add the title of each post into each result, too (this doesn't come standard with lunr.js)
        for(var result in results) {
            var ref = results[result].ref;
            var matches = data.filter(function(post) {
                return post.url === ref;
            });
            if(matches.length == 1)
            {
                var match = matches[0];
                results[result].title = match.title;
                results[result].excerpt = match.excerpt;
            }

        }

		// show how many results there were, in the DOM
        $resultsCount.text(results.length + (results.length === 1 ? ' result' : ' results') + ' for "' + query.get() +'":');

        // get the total score of all items, so that we can divide each result into it, giving us a percentage
        $.each(results, function(i, result) {
            totalScore+=result.score;
        });
    
    /* render the results to screen */
        $.each(results, function(i,result) {
            percentOfTotal = result.score/totalScore;

            $results.append('<li><p class="result"><span class="score">' + parseInt(percentOfTotal * 100) +  '%</span> <a href="'+ site + result.ref +'">'+result.title+'</a></p><p class="excerpt">' + result.excerpt + '</p></li>');
        });
    }(Query));
})