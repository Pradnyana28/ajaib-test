import React from 'react';
import { Flex, Input, Text, InputGroup, InputRightAddon, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchAndFilterProps { };

const SearchAndFilter = (props: SearchAndFilterProps) => {
    return (
        <Flex gap={2}>
            <div>
                <Text fontSize='sm'>Search</Text>
                <InputGroup size='sm'>
                    <Input placeholder='Search Keywords' />
                    <InputRightAddon children={<SearchIcon />} />
                </InputGroup>
            </div>
            <div>
                <Text fontSize='sm'>Gender</Text>
                <Select size='sm' placeholder='Select Gender'>
                    <option value={'all'} selected>All</option>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                </Select>
            </div>
        </Flex>
    );
}

export default SearchAndFilter;