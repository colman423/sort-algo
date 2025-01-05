export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const nextframe = () => new Promise((resolve) => requestAnimationFrame(resolve));
