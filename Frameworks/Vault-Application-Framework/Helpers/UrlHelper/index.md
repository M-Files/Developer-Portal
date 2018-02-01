---
layout: page
title: The UrlHelper class in the Vault Application Framework
includeInSearch: true
breadcrumb: UrlHelper
---

`UrlHelper` is contained in the `MFiles.VAF.Common` namespace and provides common utility methods for generating URLs to M-Files content.

* `GetBaseUrlForWebAccess` - returns the defined base URL for M-Files Web Access.  For example, this may be `https://m-files.mycompany.com`.

* `GetHyperlinkFragmentHtml` - returns a HTML-formatted set of links to an object, including Desktop, Web and Mobile links (if defined).

* `GetHyperlinkFragmentPlain` - return a plain-text-formatted set of links to an object, including Desktop, Web and Mobile links (if defined).

* `GetObjectUrl` - returns an URL to the object.  The URL type returned depends upon the supplied `UrlTargetPlatform` (Web, Mobile or Desktop).

* `GetObjectUrlForDesktop` - returns a URL pointing to an object for M-Files Desktop.

* `GetObjectUrlForMobile` - returns a URL pointing to an object for M-Files mobile applications.

* `GetObjectUrlForWeb` - returns a URL pointing to an object for M-Files Web.
