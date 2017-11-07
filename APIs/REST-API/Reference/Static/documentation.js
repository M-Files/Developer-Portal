$(function () {

    var tooltips = {
        '(type)' :
            '<b><tt>&lt;number&gt;</tt></b><br>' +
            '- Refers to an object type ID',

        '(objectid)' :
            '<b><tt>&lt;number&gt;</tt></b><br>' +
            '- Refers to an internal object ID<br>' +
            '<b><tt>e&lt;string&gt;</tt></b><br>' +
            '- Refers to an external object ID',

        '(version)' :
            '<b><tt>&lt;number&gt;</tt></b><br>' +
            '- Specifies the version number<br>' +
            '<b><tt>\'latest\'</tt></b><br>' +
            '- Refers to the latest available version<br>' +
            '- May also be left out which equals \'latest\'.',

        '(file)' :
            '<b><tt>&lt;number&gt;</tt></b><br>' +
            '- Refers to a file ID',

        '(id)' :
            '<b><tt>&lt;number&gt;</tt></b><br>' +
            '- Refers to an ID',

        '(path)' :
            '<b><tt>&lt;path&gt;</tt></b><br>' +
            '- Any number of path segments separated with \'/\'.<br>' +
            '- See Encoding syntax for the path encoding.'

    }
    
    var ids = [];
    $('div.navigation .open').each(function () {
        ids.push($(this).attr('id'));
    });

    $('div.navigation-tree').jstree({
        plugins: [ 'themes', 'html_data', 'types' ],
        core: {
            html_titles: true,
            animation: 0,
            initially_open: ids
        },
        themes: {
            'theme': 'mfiles',
            'dots' : false
        },
        types: {
            types: {
                page: {
                    icon: {
                        image: MFWSPageRoot + '/static/images/file.gif'
                    }
                },
                resource: {
                    icon: {
                        image: MFWSPageRoot + '/static/images/resource.gif'
                    }
                },
                struct: {
                    icon: {
                        image: MFWSPageRoot + '/static/images/struct.gif'
                    }
                },
                'enum': {
                    icon: {
                        image: MFWSPageRoot + '/static/images/enum.gif'
                    }
                }
            }
        }
    })

    setTimeout(function() {
        $('div.navigation-tree > ul').show()
    }, 0);

    $('div.resource h2').each(function (val) {
        $this = $(this);

        var pattern = $this.html();
        pattern = pattern.replace(
            /(\(\w*\))/g,
            '<span class="parameter">$1</span>');
        $this.html(pattern);
    });

    $('div.resource h2 span.parameter').each(function () {
        $span = $(this);
        var text = tooltips[$span.text()];

        if( text ) {
            $span.simpletip({
                content: tooltips[$span.text()],
                fixed: false,
                offset: [ 10, 20 ]
            });
        }
    });

    $('.sample-code').tabs();

});

function expandNode (id) {
    $('div.navigation-tree').jstree('open_node', '#' + id);
};
