$(function () {

    $('div#indexbody a').addClass('btn');

    $('div#indexbody a').click(function () {
        var webContentFrame = window.parent.parent;
        webContentFrame.postMessage('closeNavigationPane', "*");
    });

});

function findIndexEntry(e) {
    if (!e)
        e = window.event;

    var term = e.srcElement.value.toLowerCase();
    var regex = new RegExp('^' + term, 'i');
    var found = false;

    $('div#indexbody > a, div#indexbody span').each(function (index, element) {
        if ($(element).text().match(regex)) {
            $(element).css('display', 'inline-block');
            $(element).next('br').css('display', 'inline');
            $(element).next('blockquote').css('display', 'block');
        }
        else {
            $(element).css('display', 'none');
            $(element).next('br').css('display', 'none');
            $(element).next('blockquote').css('display', 'none');
        }
    });
}