var clearDisplayModeFromLocalStorage = false;
var isForceDisplayDesktop = false;
var isForceDisplayMobile = false;
var isForceDisplayTablet = false;

function getDeviceType() {

    var forcedDisplayMode = getForcedDisplayMode();
    if (forcedDisplayMode != null) {
        return forcedDisplayMode;
    }

    if (Modernizr.touch) {

        if (Modernizr.mq("screen and (orientation: portrait) and (max-device-width: 600px)")) {
            return "MOBILE";
        }
        else if (Modernizr.mq("screen and (orientation: landscape) and (max-device-width: 767px)")) {
            return "MOBILE";
        }
        else {
            return "TABLET";
        }

    }
        // Specific check for windows phone as Modernizr returns false for the touch property
    else if (navigator.userAgent.indexOf('Windows Phone OS') != -1) {
        return "MOBILE";
    }

    return "DESKTOP";

}

function getForcedDisplayMode() {

    var currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    var responsiveStorageId = 'innovasys-responsive-' + currentPath.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (window.getLocalStorage().getAttribute(responsiveStorageId) != null) {
        if (clearDisplayModeFromLocalStorage == true) {
            window.getLocalStorage().setAttribute(responsiveStorageId, null);
        }
        else {
            return window.getLocalStorage().getAttribute(responsiveStorageId);
        }
    }

    if (isForceDisplayDesktop == true || window.location.hash == "#ForceDisplayDesktop") {
        window.getLocalStorage().setAttribute(responsiveStorageId, "DESKTOP");
        return "DESKTOP";
    }
    else if (isForceDisplayMobile == true || window.location.hash == "#ForceDisplayMobile") {
        window.getLocalStorage().setAttribute(responsiveStorageId, "MOBILE");
        return "MOBILE";
    }
    else if (isForceDisplayTablet == true || window.location.hash == "#ForceDisplayTablet") {
        window.getLocalStorage().setAttribute(responsiveStorageId, "TABLET");
        return "TABLET";
    }

    return null;

}

var LocalStorageHandler = function () {

    var storageMethod = "native";
    var cookieValue = null;
    var storageElement = null;

    if (!window.localStorage) {
        if (location.protocol == "ms-its:") {
            // Cookies don't work in CHM so we use userdata behavior instead
            storageMethod = "userdata";
            var storageElement = $("<link />");
            storageElement.css("behavior", "url(#default#userdata)");
            storageElement.appendTo("body");
            storageElement = storageElement.get(0);
            storageElement.load("localStorage");
        } else {
            // If local storage isn't available, fall back to cookie storage
            storageMethod = "cookie";
            cookieValue = $.cookie("localStorage");
            if (cookieValue) {
                cookieData = JSON.parse(cookieValue);
            } else {
                cookieData = {};
            }
        }
    }

    return {

        setAttribute: function (key, value) {
            if (storageMethod == "native") {
                if (value == null || undefined == value) {
                    window.localStorage.removeItem(key);
                }
                else {
                    window.localStorage.setItem(key, value);
                }
            } else if (storageMethod == "cookie") {
                if (value == null) {
                    cookieData[key] = null;
                } else {
                    cookieData[key] = value + '';
                }
                $.cookie("localStorage", JSON.stringify(cookieData), { expires: 365, path: "/", domain: "" });
            } else if (storageMethod == "userdata") {
                storageElement.setAttribute(key, value + '');
                storageElement.save("localStorage");
            }
        },
        getAttribute: function (key) {
            if (storageMethod == "native") {
                return window.localStorage.getItem(key);
            } else if (storageMethod == "cookie") {
                if (cookieData[key] === undefined) {
                    return null;
                } else {
                    return cookieData[key];
                }
            } else if (storageMethod == "userdata") {
                return storageElement.getAttribute(key);
            }
        }

    }

};

// Get a local storage instance, initializing the first time it is called
window.getLocalStorage = function () {
    if (!this.localStorageInstance) {
        this.localStorageInstance = new LocalStorageHandler();
    }
    return this.localStorageInstance;
}