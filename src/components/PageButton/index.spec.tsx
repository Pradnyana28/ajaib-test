import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PageButton from '.';

describe('<PageButton />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<PageButton pageNumber={10} />);
        expect(container).toMatchSnapshot();
    });
});