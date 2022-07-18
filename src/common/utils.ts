export const debounce = (ms = 750) => {
    let timer: NodeJS.Timeout | undefined;

    return async (task: (...args: any) => void, ...args: any) => {
        try {
            clearTimeout(timer);

            timer = setTimeout(() => {
                task.apply(this, args);
            }, ms) as any;
        } catch (error) {
            timer = undefined;
        }
    }
};