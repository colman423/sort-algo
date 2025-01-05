import { bubbleSort, heapSort } from './algorithm';
import { DataChangeHandler } from './type';
import { initDataPoint, initSortingButton, updateDataPoint } from './ui';

initSortingButton();
initDataPoint();

const algorithmMap = {
  bubble: bubbleSort,
  heap: heapSort,
};

document.querySelector('#sort-btn-container')!.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.algorithm) {
    const data = initDataPoint();

    const algorithm = target.dataset.algorithm;
    const func = algorithmMap[algorithm as keyof typeof algorithmMap];

    let allChanges: { index: number; val: number }[] = [];

    const dataChanger: DataChangeHandler = async (changes) => {
      allChanges = allChanges.concat(changes);
    };

    await func(JSON.parse(JSON.stringify(data)), dataChanger);

    await updateDataPoint(allChanges);
  }
});
