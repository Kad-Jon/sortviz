export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let tmp = array[i];
        let j = Math.floor(Math.random() * i);
        array[i] = array[j];
        array[j] = tmp;
    }
}
