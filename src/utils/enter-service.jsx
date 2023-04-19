export const onEnter = (e, callback) => {
    if (e.keyCode === 13) {
        callback();
    }
}