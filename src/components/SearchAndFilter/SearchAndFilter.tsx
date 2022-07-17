import React from 'react';
import { Flex, Input, Text, InputGroup, InputRightAddon, Select, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchAndFilterProps {
    filterValue?: string;

    getSearchValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
    getFilterValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
};

export const FILTER_DEFAULT_VALUE = 'all';

const SearchAndFilter = (props: SearchAndFilterProps) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState(FILTER_DEFAULT_VALUE);

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

    const _onResetFilter = () => {
        setFilterValue(FILTER_DEFAULT_VALUE);
        setSearchValue('');
        props.getFilterValue && props.getFilterValue(FILTER_DEFAULT_VALUE);
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
            <div>
                <Text fontSize='sm'>&nbsp;</Text>
                <Button data-testid='reset-filter-button' onClick={_onResetFilter} size='sm'>Reset Filter</Button>
            </div>
        </Flex>
    );
}

export default SearchAndFilter;