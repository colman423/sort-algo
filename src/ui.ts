import './style.css';
import { BATCH_UPDATE_SIZE, getBarCount, getBarHeight, getBarMaxValue } from './preference';
import { nextframe } from './utils';
import type { DataChangeHandler } from './type';

const getTransformedHeight = (val: number) => (val * getBarHeight()) / getBarMaxValue();

export const initSortingButton = () => {
  const sortingBtnTemplate = (document.querySelector('#sort-btn-template')! as HTMLTemplateElement).content
    .firstElementChild!;
  const sortingBtnContainer = document.querySelector('#sort-btn-container')!;

  const sortingAlgorithms = ['bubble', 'selection', 'insertion', 'heap', 'quick', 'merge'];

  sortingAlgorithms.forEach((algorithm) => {
    const btn = sortingBtnTemplate.cloneNode(true) as HTMLElement;
    btn.textContent = algorithm;
    btn.dataset.algorithm = algorithm;
    btn.addEventListener('click', () => {
      console.log('Sorting with', algorithm);
    });
    sortingBtnContainer.appendChild(btn);
  });
};

export const initDataPoint = () => {
  const data = Array.from({ length: getBarCount() }, () => Math.floor(Math.random() * getBarMaxValue()));

  const barContainer = document.querySelector('#bars-container')!;
  barContainer.innerHTML = '';

  const barTemplate = (document.querySelector('#bar-template')! as HTMLTemplateElement).content.firstElementChild!;

  data.forEach((value) => {
    const bar = barTemplate.cloneNode(true) as HTMLElement;

    bar.style.height = `${getTransformedHeight(value)}px`;
    barContainer.appendChild(bar);
  });

  return data;
};

export const updateDataPoint: DataChangeHandler = async (changes) => {
  for (let i = 0; i < changes.length; i++) {
    const { index, val } = changes[i];
    const barContainer = document.querySelector('#bars-container')!;
    const bar = barContainer.children[index] as HTMLElement;
    bar.style.height = `${getTransformedHeight(val)}px`;
    if (i % BATCH_UPDATE_SIZE === 0) {
      await nextframe();
    }
  }
};
