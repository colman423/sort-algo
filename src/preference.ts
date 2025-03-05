const CHART_WIDTH = 800;
const BAR_HEIGHT = 1000; // TODO
const BAR_WIDTH = 2;
const BAR_COUNT = CHART_WIDTH / BAR_WIDTH;
const BAR_MAX_VALUE = 10000;
export const BATCH_UPDATE_SIZE = 3;

export const getBarCount = () => BAR_COUNT;
export const getBarHeight = () => BAR_HEIGHT;
export const getBarMaxValue = () => BAR_MAX_VALUE;
