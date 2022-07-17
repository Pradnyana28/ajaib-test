import React from 'react';
import { Flex, Input, Text, InputGroup, InputRightAddon, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchAndFilterProps {
    filterValue?: string;

    getSearchValue?: (value: string) => void;
    onFilterChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

const SearchAndFilter = (props: SearchAndFilterProps) => {
    const [searchValue, setSearchValue] = React.useState('');

    const _onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        props.getSearchValue && props.getSearchValue(e.target.value);
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
                    defaultValue='all'
                    value={props.filterValue}
                    placeholder='Select Gender'
                    onChange={props.onFilterChange}
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