class EventDispatcher {
    static get LOGGED_IN() {
        return 'logged-in';
    }

    static get MEDIA_CHANGED() {
        return 'media-changed';
    }

    static listen(eventName, callback) {
        document.addEventListener(eventName, callback);
    }

    static deafen(eventName, callback) {
        document.removeEventListener(eventName, callback);
    }

    static trigger(eventName, data = null) {
        document.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }
}

export default EventDispatcher;