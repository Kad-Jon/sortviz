import ArrayPointer from "../module/ArrayPointer";

export default async function randomizedquick(arr) {
    await randomizedQuick(arr, 0, arr.length - 1);
    arr.sorted();
}

async function randomizedQuick(arr, start, end) {
    if (start < end) {
        const partitionIndex = await partition(arr, start, end);

        await randomizedQuick(arr, start, partitionIndex - 1);
        await randomizedQuick(arr, partitionIndex + 1, end);
    }
}

async function partition(arr, start, end) {
    const randomIndex = start + Math.floor(Math.random() * (end - start + 1));
    const pivot = await arr.get(randomIndex);
    await arr.swap(end, randomIndex);
    arr.mark(end, "yellow");

    let i = new ArrayPointer(start);
    let j = new ArrayPointer(start);
    arr.trackPointer(i, "green");
    arr.trackPointer(j, "green");

    while (j < end) {
        if ((await arr.compareToVal(j, pivot)) === -1) {
            await arr.swap(i, j);
            i.increment();
        }
        j.increment();
    }

    arr.untrackPointers(i, j);
    arr.unmarkAll();
    await arr.swap(i, end);

    return i;
}
