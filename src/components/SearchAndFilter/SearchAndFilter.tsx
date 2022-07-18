import React, { useContext } from 'react';
import { Flex, Input, Text, InputGroup, InputRightAddon, Select, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { CustomTableContext } from '../../store/customTable';

interface SearchAndFilterProps {
    filterValue?: string;
};

export const FILTER_DEFAULT_VALUE = 'all';

const SearchAndFilter = (props: SearchAndFilterProps) => {
    const { state, update } = useContext(CustomTableContext);
    const [searchValue, setSearchValue] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (searchValue !== null) {
            setTimeout(() => {
                console.log(searchValue)
                update({
                    ...state,
                    searchValue
                });
            }, 1280);
        }
    }, [searchValue]);

    const _onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setSearchValue(e.target.value);
    }

    const _onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        update({
            ...state,
            filterValue: e.target.value
        });
    }

    const _onResetFilter = () => {
        update({
            ...state,
            filterValue: FILTER_DEFAULT_VALUE,
            searchValue: ''
        });
    }

    return (
        <Flex gap={2}>
            <div>
                <Text fontSize='sm'>Search</Text>
                <InputGroup size='sm'>
                    <Input
                        data-testid='search-input'
                        placeholder='Search Keywords'
                        value={searchValue || ''}
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
                    value={state.filterValue}
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