export default async function insertionsort(arr) {
    const length = arr.length;

    for (let i = 1; i < length; i++) {
        let j = i;
        arr.markPair(j, j - 1);

        while ((await arr.compare(j, j - 1)) === -1 && j > 0) {
            await arr.swap(j, j - 1);
            j--;
        }
    }
    arr.sorted();
}
