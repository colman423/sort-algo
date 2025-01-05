export type DataChangeHandler = (changes: { index: number; val: number }[]) => Promise<void>;
