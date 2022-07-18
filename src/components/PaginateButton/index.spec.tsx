import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaginateButton from '.';

describe('<PaginateButton />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<PaginateButton totalPage={10} />);
        expect(container).toMatchSnapshot();
    });
});