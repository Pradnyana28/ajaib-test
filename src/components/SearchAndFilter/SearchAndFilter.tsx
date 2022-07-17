import React from 'react';
import { Flex, Input, Text, InputGroup, InputRightAddon, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchAndFilterProps {
    filterValue?: string;

    getSearchValue?: (value: string) => void;
    getFilterValue?: (value: string) => void;
};

const SearchAndFilter = (props: SearchAndFilterProps) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState('all');

    const _onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        props.getSearchValue && props.getSearchValue(e.target.value);
    }

    const _onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setFilterValue(e.target.value);
        props.getFilterValue && props.getFilterValue(e.target.value);
    }

    return (
        <Flex gap={2}>
            <div>
                <Text fontSize='sm'>Search</Text>
                <InputGroup size='sm'>
                    <Input
                        data-testid='search-input'
                        placeholder='Search Keywords'
                        value={searchValue}
                        onChange={_onSearchChange}
                    />
                    <InputRightAddon children={<SearchIcon />} />
                </InputGroup>
            </div>
            <div>
                <Text fontSize='sm'>Gender</Text>
                <Select
                    data-testid='gender-filter'
                    size='sm'
                    value={filterValue}
                    placeholder='Select Gender'
                    onChange={_onFilterChange}
                >
                    <option value={'all'} data-testid='gender-filter-all'>All</option>
                    <option value={'male'} data-testid='gender-filter-male'>Male</option>
                    <option value={'female'} data-testid='gender-filter-female'>Female</option>
                </Select>
            </div>
        </Flex>
    );
}

export default SearchAndFilter;