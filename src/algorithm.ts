import type { DataChangeHandler } from './type';

export const bubbleSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      iterateCount++;
      if (data[j] > data[j + 1]) {
        swapCount++;
        const tmp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = tmp;
        await onChangeData([
          { index: j, val: data[j] },
          { index: j + 1, val: data[j + 1] },
        ]);
      }
    }
  }
  console.log('bubbleSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const selectionSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  for (let i = 0; i < data.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < data.length; j++) {
      iterateCount++;
      if (data[j] < data[minIdx]) {
        minIdx = j;
      }
    }
    swapCount++;
    const tmp = data[minIdx];
    data[minIdx] = data[i];
    data[i] = tmp;
    await onChangeData([
      { index: minIdx, val: data[minIdx] },
      { index: i, val: data[i] },
    ]);
  }
  console.log('selectionSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const insertionSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  for (let i = 1; i < data.length; i++) {
    const key = data[i];
    let j = i - 1;
    while (j >= 0 && data[j] > key) {
      iterateCount++;
      swapCount++;
      data[j + 1] = data[j];
      await onChangeData([{ index: j + 1, val: data[j + 1] }]);
      j = j - 1;
    }
    swapCount++;
    data[j + 1] = key;
    await onChangeData([{ index: j + 1, val: data[j + 1] }]);
  }
  console.log('insertionSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const heapSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  const n = data.length;

  const heapify = async (data: number[], n: number, i: number, onChangeData: DataChangeHandler) => {
    iterateCount++;

    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && data[l] > data[largest]) {
      largest = l;
    }
    if (r < n && data[r] > data[largest]) {
      largest = r;
    }
    if (largest !== i) {
      swapCount++;
      const tmp = data[i];
      data[i] = data[largest];
      data[largest] = tmp;
      await onChangeData([
        { index: i, val: data[i] },
        { index: largest, val: data[largest] },
      ]);
      await heapify(data, n, largest, onChangeData);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(data, n, i, onChangeData);
  }
  for (let i = n - 1; i > 0; i--) {
    swapCount++;
    const tmp = data[0];
    data[0] = data[i];
    data[i] = tmp;
    await onChangeData([
      { index: 0, val: data[0] },
      { index: i, val: data[i] },
    ]);
    await heapify(data, i, 0, onChangeData);
  }

  console.log('heapSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const quickSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  const partition = async (data: number[], low: number, high: number, onChangeData: DataChangeHandler) => {
    const pivot = data[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      iterateCount++;
      if (data[j] < pivot) {
        i++;
        swapCount++;
        const tmp = data[i];
        data[i] = data[j];
        data[j] = tmp;
        await onChangeData([
          { index: i, val: data[i] },
          { index: j, val: data[j] },
        ]);
      }
    }
    swapCount++;
    const tmp = data[i + 1];
    data[i + 1] = data[high];
    data[high] = tmp;
    await onChangeData([
      { index: i + 1, val: data[i + 1] },
      { index: high, val: data[high] },
    ]);
    return i + 1;
  };

  const quickSort = async (data: number[], low: number, high: number, onChangeData: DataChangeHandler) => {
    if (low < high) {
      const pi = await partition(data, low, high, onChangeData);
      await quickSort(data, low, pi - 1, onChangeData);
      await quickSort(data, pi + 1, high, onChangeData);
    }
  };

  await quickSort(data, 0, data.length - 1, onChangeData);

  console.log('quickSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const mergeSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  const merge = async (data: number[], l: number, m: number, r: number, onChangeData: DataChangeHandler) => {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      L[i] = data[l + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = data[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      iterateCount++;
      if (L[i] <= R[j]) {
        swapCount++;
        data[k] = L[i];
        await onChangeData([{ index: k, val: data[k] }]);
        i++;
      } else {
        swapCount++;
        data[k] = R[j];
        await onChangeData([{ index: k, val: data[k] }]);
        j++;
      }
      k++;
    }

    while (i < n1) {
      swapCount++;
      data[k] = L[i];
      await onChangeData([{ index: k, val: data[k] }]);
      i++;
      k++;
    }

    while (j < n2) {
      swapCount++;
      data[k] = R[j];
      await onChangeData([{ index: k, val: data[k] }]);
      j++;
      k++;
    }
  };

  const mergeSort = async (data: number[], l: number, r: number, onChangeData: DataChangeHandler) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      await mergeSort(data, l, m, onChangeData);
      await mergeSort(data, m + 1, r, onChangeData);
      await merge(data, l, m, r, onChangeData);
    }
  };

  await mergeSort(data, 0, data.length - 1, onChangeData);

  console.log('mergeSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const radixSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  const getMax = (arr: number[], n: number) => {
    let mx = arr[0];
    for (let i = 1; i < n; i++) {
      iterateCount++;
      if (arr[i] > mx) {
        mx = arr[i];
      }
    }
    return mx;
  };

  const countSort = async (arr: number[], n: number, exp: number, onChangeData: DataChangeHandler) => {
    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      iterateCount++;

      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      iterateCount++;

      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      iterateCount++;
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
      iterateCount++;
      swapCount++;
      arr[i] = output[i];
      await onChangeData([{ index: i, val: arr[i] }]);
    }
  };

  const radix = async (arr: number[], n: number, onChangeData: DataChangeHandler) => {
    const m = getMax(arr, n);

    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
      iterateCount++;
      await countSort(arr, n, exp, onChangeData);
    }
  };

  await radix(data, data.length, onChangeData);

  console.log('radixSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};

export const cocktailSort = async (data: number[], onChangeData: DataChangeHandler) => {
  const startTime = Date.now();
  let iterateCount = 0;
  let swapCount = 0;

  let swapped = true;
  let start = 0;
  let end = data.length;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; i++) {
      iterateCount++;
      if (data[i] > data[i + 1]) {
        swapCount++;
        const tmp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = tmp;
        await onChangeData([
          { index: i, val: data[i] },
          { index: i + 1, val: data[i + 1] },
        ]);
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      iterateCount++;
      if (data[i] > data[i + 1]) {
        swapCount++;
        const tmp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = tmp;
        await onChangeData([
          { index: i, val: data[i] },
          { index: i + 1, val: data[i + 1] },
        ]);
        swapped = true;
      }
    }
    start++;
  }
  console.log('cocktailSort time:', Date.now() - startTime, 'iterate:', iterateCount, 'swap:', swapCount);
};
