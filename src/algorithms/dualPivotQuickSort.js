import ArrayPointer from "../module/ArrayPointer";
export default async function dualpivotquicksort(arr) {
    await dualPivotQuickSort(arr, 0, arr.length - 1);
    arr.sorted();
}

async function dualPivotQuickSort(arr, start, end) {
    if (start < end) {
        const partitions = await partition(arr, start, end);

        await dualPivotQuickSort(arr, start, partitions[0] - 1);
        await dualPivotQuickSort(arr, partitions[0] + 1, partitions[1] - 1);
        await dualPivotQuickSort(arr, partitions[1] + 1, end);
    }
}

async function partition(arr, start, end) {
    if ((await arr.compare(start, end)) === 1) {
        await arr.swap(start, end);
    }

    arr.markPair(start, end, "yellow");

    const lpivot = await arr.get(start);
    const rpivot = await arr.get(end);

    let i = new ArrayPointer(start + 1);
    let j = new ArrayPointer(end - 1);
    let curr = new ArrayPointer(start + 1);

    arr.trackPointer(i, "green");
    arr.trackPointer(j, "green");

    while (curr <= j) {
        let currVal = await arr.get(curr);
        if (currVal < lpivot) {
            await arr.swap(curr, i);
            i.increment();
        } else if (currVal >= rpivot) {
            while ((await arr.compareToVal(j, rpivot)) === 1 && curr < j) {
                j.decrement();
            }

            await arr.swap(curr, j);
            j.decrement();

            if ((await arr.compareToVal(curr, lpivot)) === -1) {
                await arr.swap(curr, i);
                i.increment();
            }
        }
        curr.increment();
    }

    i.decrement();
    j.increment();

    arr.untrackPointers(i, j);
    arr.unmarkPair(start, end);
    await arr.swap(start, i, "yellow");
    await arr.swap(end, j, "yellow");
    return [i, j];
}
