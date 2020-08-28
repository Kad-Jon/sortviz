import ArrayPointer from "../module/ArrayPointer";

export default async function selectionsort(arr) {
    let length = arr.length;

    let min = new ArrayPointer(0);
    arr.trackPointer(min, "purple");

    for (let i = 0; i < length; i++) {
        min.pointTo(i);

        let minVal = await arr.get(min);
        for (let j = i; j < length; j++) {
            const currVal = await arr.get(j);
            if (currVal < minVal) {
                min.pointTo(j);
                minVal = currVal;
            }
        }

        await arr.swap(i, min);
        arr.unmark(min);
    }
    arr.sorted();
}
