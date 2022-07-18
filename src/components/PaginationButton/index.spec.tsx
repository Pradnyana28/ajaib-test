import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaginationButton from '.';

describe('<PaginationButton />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<PaginationButton page={1} totalPage={10} />);
        expect(container).toMatchSnapshot();
    });
});