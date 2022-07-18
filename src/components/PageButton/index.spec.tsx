import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PageButton from '.';

describe('<PageButton />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<PageButton page={1} pageNumber={10} />);
        expect(container).toMatchSnapshot();
    });
});