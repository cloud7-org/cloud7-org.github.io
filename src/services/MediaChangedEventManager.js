import EventDispatcher from "./EventDispatcher.js";

const breakpoints = [
    0, //xs
    576, //sm
    768, //md
    992, //lg
    1200, //xl
    1400 //xxl
];

for(const breakpoint of breakpoints){
    var mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    mql.addEventListener('change', (e) => {
        EventDispatcher.trigger(EventDispatcher.MEDIA_CHANGED);
    })
}