import {
  bubbleSort,
  selectionSort,
  insertionSort,
  heapSort,
  quickSort,
  mergeSort,
  radixSort,
  cocktailSort,
} from './algorithm';
import { DataChangeHandler } from './type';
import { initDataPoint, initSortingButton, updateDataPoint } from './ui';

initSortingButton();
initDataPoint();

const algorithmMap = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  heap: heapSort,
  quick: quickSort,
  merge: mergeSort,
  radix: radixSort,
  cocktail: cocktailSort,
};

document.querySelector('#sort-btn-container')!.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.algorithm) {
    const data = initDataPoint();

    const algorithm = target.dataset.algorithm;
    const func = algorithmMap[algorithm as keyof typeof algorithmMap];

    let allChanges: { index: number; val: number }[] = [];

    const dataChanger: DataChangeHandler = async (changes) => {
      for (const change of changes) {
        allChanges.push(change);
      }
    };

    await func(JSON.parse(JSON.stringify(data)), dataChanger);

    await updateDataPoint(allChanges);
  }
});
