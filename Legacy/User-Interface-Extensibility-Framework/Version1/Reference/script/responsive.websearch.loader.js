yepnope.insertBeforeElement = document.getElementById('responsive-marker');
switch (getDeviceType())
{
	case "MOBILE":
    case "TABLET":
        Modernizr.load(['stylesheets/bootstrap.css',
                        'stylesheets/responsive.websearch.css',
                        'script/responsive.websearch.js']);
		break;
}

