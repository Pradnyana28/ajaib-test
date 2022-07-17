import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchAndFilter from './SearchAndFilter';

describe('SearchAndFilter', () => {
    it('renders without crashing', async () => {
        render(<SearchAndFilter />)
    });
});