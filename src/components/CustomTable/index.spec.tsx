import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomTable from '.';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
    }),
) as jest.Mock;

describe('<CustomTable />', () => {
    it('renders without crashing', async () => {
        const { container } = render(<CustomTable fetchEndpoint='' dataMapping={(data) => ([])} />);
        expect(container).toMatchSnapshot();
    });
});