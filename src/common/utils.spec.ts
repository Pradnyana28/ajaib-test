import { debounce } from "./utils";

const sleep = (ms = 250) => new Promise(resolve => {
    setTimeout(() => {
        resolve(true);
    }, ms);
});

describe('debounce()', () => {
    it('should only executed once after several clicks', async () => {
        const deb = debounce(120);
        const mockFn = jest.fn();

        deb(mockFn);
        deb(mockFn);
        deb(mockFn);

        await sleep();

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});