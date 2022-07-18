import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableWrapper from '.';
import { Sorting } from '../CustomTable';

describe('<TableWrapper />', () => {
    const mockSortHandler = jest.fn();
    const mockColumnsData = [
        {
            username: {
                label: 'Username',
                value: 'Kadek Pradnyana',
                sorting: Sorting.ASCENDING,
                isSortable: true,
                isSearchable: true,
                isNumeric: false
            }
        }
    ];

    it('renders without crashing: no data', async () => {
        const { container } = render(<TableWrapper data={[]} handleSort={mockSortHandler} />);
        expect(container.innerHTML).toEqual('<p>No data found.</p>');
    });

    it('renders without crashing: with data', async () => {
        const { container } = render(<TableWrapper data={mockColumnsData} handleSort={mockSortHandler} />);
        expect(container).toMatchSnapshot();
    });
});