import React, { useContext } from 'react';
import {
    Flex,
    Stack,
    Spacer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Table,
    TableContainer,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Sorting } from '../CustomTable';
import { CustomTableContext } from '../../store/customTable';

interface TableData {
    label: string;
    isSearchable: boolean;
    isSortable: boolean;
    value?: string;
    isNumeric?: boolean;
    sorting: Sorting;
};

export interface TableItem {
    [field: string]: TableData;
};

const TableWrapper = (props: { data: TableItem[] }) => {
    const { state, update } = useContext(CustomTableContext);

    const firstItem = props.data[0];

    const _onHandleSort = (field: string, sorting: Sorting) => {
        // props.handleSort(field, sorting === Sorting.ASCENDING ? Sorting.DESCENDING : Sorting.ASCENDING);
        update({
            ...state,
            sort: {
                by: field,
                order: sorting === Sorting.ASCENDING ? Sorting.DESCENDING : Sorting.ASCENDING
            }
        });
    }

    return props.data?.length ? (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        {Object.keys((firstItem)).map(d =>
                            <Th
                                key={d}
                                isNumeric={firstItem[d].isNumeric}
                                cursor={firstItem[d].isSortable ? 'pointer' : undefined}
                                onClick={firstItem[d].isSortable ? () => _onHandleSort(d, firstItem[d].sorting) : undefined}
                            >
                                <Flex minWidth='max-content'>
                                    {firstItem[d].label}
                                    <Spacer />
                                    {firstItem[d].isSortable && (
                                        <Stack spacing={-1}>
                                            <ChevronUpIcon color={firstItem[d].sorting === Sorting.DESCENDING ? 'gray.200' : undefined} />
                                            <ChevronDownIcon color={firstItem[d].sorting === Sorting.ASCENDING ? 'gray.200' : undefined} />
                                        </Stack>
                                    )}
                                </Flex>
                            </Th>
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {props.data.map((d, idx) => (
                        <Tr key={idx}>
                            {Object.keys(d).map(item => <Td key={item} isNumeric={d[item].isNumeric}>{d[item].value}</Td>)}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    ) : <p>No data found.</p>;
};

export default TableWrapper;