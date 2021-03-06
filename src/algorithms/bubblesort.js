export default async function bubblesort(arr) {
    let sorted = false;
    let lastSortedIndex = arr.length;

    while (!sorted) {
        sorted = true;

        for (let i = 0; i < lastSortedIndex - 1; i++) {
            if ((await arr.compare(i, i + 1)) === 1) {
                await arr.swap(i, i + 1);
                sorted = false;
            }
        }
        lastSortedIndex--;
    }

    arr.sorted();
}
