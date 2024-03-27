// referencing https://www.joshwcomeau.com/snippets/javascript/debounce/
export const debounce = (callback, wait) => {
    console.log("dbeouncing")
    let timer = null;
    return (...args) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}
