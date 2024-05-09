yepnope.insertBeforeElement = document.getElementById('responsive-marker');
switch (getDeviceType()) {

    case "MOBILE":
        Modernizr.load(['stylesheets/bootstrap.css',
                        'stylesheets/mobile.webnav.2012.css',
                        'script/responsive.webnav.js']);
        break;
    case "TABLET":
        Modernizr.load(['stylesheets/bootstrap.css',
                        'stylesheets/tablet.webnav.2012.css',
                        'script/responsive.webnav.js']);
        break;

}