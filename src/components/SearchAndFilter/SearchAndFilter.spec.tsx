import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import SearchAndFilter from './SearchAndFilter';
import userEvent from "@testing-library/user-event";

describe('<SearchAndFilter />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<SearchAndFilter />);
        expect(container).toMatchSnapshot();
    });

    it('should have default value for filter component', async () => {
        const { getByTestId } = render(<SearchAndFilter />);
        expect((getByTestId('gender-filter-all') as HTMLOptionElement).selected).toBe(true);
        expect((getByTestId('gender-filter-male') as HTMLOptionElement).selected).toBe(false);
        expect((getByTestId('gender-filter-female') as HTMLOptionElement).selected).toBe(false);
    });

    it('should able to search and change value', async () => {
        const { getByTestId } = render(<SearchAndFilter />) as any;

        fireEvent.change(getByTestId('search-input'), {
            target: {
                value: 'Hello'
            }
        });

        expect(getByTestId('search-input').value).toBe('Hello');
    });

    it('should able to search and change value', async () => {
        const { getByTestId } = render(<SearchAndFilter />);
        const inputElement = getByTestId('search-input') as HTMLInputElement;

        await waitFor(
            () => userEvent.type(inputElement, 'Hello world')
        );

        expect(inputElement.value).toBe('Hello world');
    });
});