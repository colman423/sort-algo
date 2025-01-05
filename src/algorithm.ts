import type { DataChangeHandler } from './type';

export const bubbleSort = async (data: number[], onChangeData: DataChangeHandler) => {
  var t = Date.now();
  var i = 0;
  for (var i = 0; i < data.length - 1; i++) {
    for (var j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
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
  console.log('bubble time:', Date.now() - t);
};

export const heapSort = async (data: number[], onChangeData: DataChangeHandler) => {
  var t = Date.now();

  const heapify = async (data: number[], n: number, i: number, onChangeData: DataChangeHandler) => {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && data[l] > data[largest]) {
      largest = l;
    }
    if (r < n && data[r] > data[largest]) {
      largest = r;
    }
    if (largest !== i) {
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

  var n = data.length;
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(data, n, i, onChangeData);
  }
  for (var i = n - 1; i > 0; i--) {
    const tmp = data[0];
    data[0] = data[i];
    data[i] = tmp;
    await onChangeData([
      { index: 0, val: data[0] },
      { index: i, val: data[i] },
    ]);
    await heapify(data, i, 0, onChangeData);
  }

  console.log('heap time:', Date.now() - t);
};
