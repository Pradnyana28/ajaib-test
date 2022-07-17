import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from './SearchAndFilter';
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

    it('should be able to search and change value', async () => {
        const { getByTestId } = render(<SearchAndFilter />) as any;

        fireEvent.change(getByTestId('search-input'), {
            target: {
                value: 'Hello'
            }
        });

        expect(getByTestId('search-input').value).toBe('Hello');
    });

    it('should be able to search and change value', async () => {
        const { getByTestId } = render(<SearchAndFilter />);
        const inputElement = getByTestId('search-input') as HTMLInputElement;

        await userEvent.type(inputElement, 'Hello world');

        expect(inputElement.value).toBe('Hello world');
    });

    it('should be able to override filter value', async () => {
        const { getByTestId } = render(<SearchAndFilter />) as any;

        fireEvent.select(getByTestId('gender-filter'), {
            target: {
                value: 'male'
            }
        });

        expect((getByTestId('gender-filter-male') as HTMLOptionElement).selected).toBe(true);
    });

    it('should be able to change the filter options', async () => {
        const { getByTestId } = render(<SearchAndFilter />);
        const selectElement = getByTestId('gender-filter') as HTMLSelectElement;

        await userEvent.selectOptions(selectElement, 'male');

        expect(selectElement.value).toBe('male');
    });

    it('should be able to reset the filter to default', async () => {
        const { getByTestId } = render(<SearchAndFilter />);
        const selectElement = getByTestId('gender-filter') as HTMLSelectElement;
        const buttonElement = getByTestId('reset-filter-button');

        await userEvent.selectOptions(selectElement, 'male');
        await userEvent.click(buttonElement);

        expect(selectElement.value).toBe(FILTER_DEFAULT_VALUE);
    });
});