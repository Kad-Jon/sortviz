export default async function mergesort(arr) {
    await mergeSort(arr, 0, arr.length);
    arr.sorted();
}

async function mergeSort(arr, start, end) {
    if (start + 1 < end) {
        const mid = Math.floor((start + end) / 2);

        await mergeSort(arr, start, mid);
        await mergeSort(arr, mid, end);

        await merge(arr, start, mid, end);
    }
}

async function merge(arr, start, mid, end) {
    arr.mark(start, "yellow");
    arr.mark(mid, "purple");
    arr.mark(end - 1, "yellow");

    const shadowArr = [];

    let i = start,
        j = mid;

    while (i < mid && j < end) {
        const vali = await arr.get(i),
            valj = await arr.get(j);

        shadowArr.push(vali < valj ? vali : valj);
        vali < valj ? i++ : j++;
    }

    while (i < mid) shadowArr.push(await arr.get(i++));
    while (j < end) shadowArr.push(await arr.get(j++));

    arr.unmark(mid);

    for (i = 0; i < end - start; ++i) {
        await arr.set(start + i, shadowArr[i]);
    }

    arr.unmark(start);
    arr.unmark(end - 1);
}
