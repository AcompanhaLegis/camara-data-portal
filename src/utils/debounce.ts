// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
        !!timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export default debounce;