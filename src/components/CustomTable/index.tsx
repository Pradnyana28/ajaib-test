import React from 'react';
import {
    Button,
    Flex,
    IconButton,
    Stack,
    Spacer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from '../SearchAndFilter/SearchAndFilter';
import * as Rambda from 'rambda';

interface RandomResponse {
    info: {
        page: number;
        results: number;
        seed: string;
        version: string;
    };
    results: RandomData[];
}

export interface RandomData {
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    gender: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        sha1: string;
        sha256: string;
        md5: string;
    },
    registered: {
        date: string;
        age: number;
    }
}

export enum Sorting {
    DESCENDING = 'DESCENDING',
    ASCENDING = 'ASCENDING'
}

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

export interface CustomTableProps {
    fetchEndpoint: string;
    dataMapping: (data: RandomData) => Record<string, Record<string, any>>;

    getSearchValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
    getFilterValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
}

const fetchAPI = async (endpoint: string, page: string, perPage: string, options: Record<string, string | undefined>) => {
    const queryString = new URLSearchParams({
        ...options,
        results: perPage,
        page: page
    });
    const response = await fetch(`${endpoint}?${queryString}`);

    if (response.ok) {
        return await response.json() as RandomResponse;
    }
};

const findColumns = (columns: any[], value: string) => columns.map(field => {
    const searchFields = Object.keys(field).filter(f =>
        field[f].isSearchable
        && field[f].value
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
    );
    return searchFields.length ? field : undefined;
}).filter(x => x);

const TableContent = (props: { data: TableItem[], handleSort: (field: string, sorting: Sorting) => void }) => {
    const firstItem = props.data[0];

    const _onHandleSort = (field: string, sorting: Sorting) => {
        console.log(field, sorting);
        props.handleSort(field, sorting === Sorting.ASCENDING ? Sorting.DESCENDING : Sorting.ASCENDING);
    }

    return (
        <>
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
        </>
    )
}

const TableWrapper = (props: { columns: any[], handleSort: (field: string, sorting: Sorting) => void }) => {
    return props.columns?.length ? (
        <TableContainer>
            <Table variant='simple'>
                <TableContent data={props.columns} handleSort={props.handleSort} />
            </Table>
        </TableContainer>
    ) : <p>No data found.</p>;
}

const ROWS_SIZE = 5123;
const ROWS_PER_PAGE = 10;
const PAGE_LENGTH = Math.ceil(ROWS_SIZE / ROWS_PER_PAGE);

const PageButton = (props: {
    page: number;
    pageNumber: number;
    handlePaginateButton: (pageNumber: number) => void;
}) => <Button size='sm' isActive={props.page === props.pageNumber} onClick={() => props.handlePaginateButton(props.pageNumber)}>{props.pageNumber}</Button>;

const PaginateButton = (props: {
    page: number,
    handlePaginateButton: (pageNumber: number) => void;
}) => {
    return (
        <>
            {Array.from({ length: PAGE_LENGTH }, (v, i) => i + 1).map((pageNumber) => {
                if (PAGE_LENGTH > 10) {
                    if (pageNumber <= 6 || pageNumber >= PAGE_LENGTH - 4) {
                        return <PageButton key={pageNumber} page={props.page} pageNumber={pageNumber} handlePaginateButton={props.handlePaginateButton} />;
                    }

                    if (pageNumber === 7) {
                        return <p>...</p>
                    }
                } else {
                    return <PageButton key={pageNumber} page={props.page} pageNumber={pageNumber} handlePaginateButton={props.handlePaginateButton} />;
                }
            })}
        </>
    );
}

const PaginationButton = (props: {
    page: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handlePaginateButton: (pageNumber: number) => void
}) => {
    return (
        <Flex minWidth='max-content'>
            <p>Page <b>{props.page}</b> of {PAGE_LENGTH}</p>
            <Spacer />
            <Stack spacing={1} direction='row' align='center'>
                <IconButton
                    aria-label='Previous page'
                    isActive={props.page <= 1}
                    size='sm'
                    onClick={props.page > 1 ? props.handlePreviousPage : undefined} icon={<ChevronLeftIcon />}
                />
                <PaginateButton page={props.page} handlePaginateButton={props.handlePaginateButton} />
                <IconButton
                    aria-label='Next page'
                    isActive={props.page >= PAGE_LENGTH}
                    size='sm' onClick={props.page < PAGE_LENGTH ? props.handleNextPage : undefined}
                    icon={<ChevronRightIcon />} />
            </Stack>
        </Flex>
    )
}

const CustomTable = (props: CustomTableProps) => {
    const [columns, setColumns] = React.useState<any[]>([]);
    const [filteredColumns, setFilteredColumns] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState(null);
    const [filterValue, setFilterValue] = React.useState(FILTER_DEFAULT_VALUE);

    React.useEffect(() => {
        if (filterValue === 'all') {
            fetchUsers(page);
        } else {
            fetchUsers(page, filterValue);
        }
    }, [filterValue]);

    React.useEffect(() => {
        if (searchValue !== null) {
            setTimeout(() => {
                searchColumns(searchValue);
            }, 750);
        }
    }, [searchValue]);

    const fetchUsers = async (page: number, gender?: string) => {
        const pageNumberFloor = Math.floor(ROWS_SIZE / ROWS_PER_PAGE);
        const offset = page > pageNumberFloor ? (ROWS_SIZE / ROWS_PER_PAGE).toString().split('.')[1][0] : String(ROWS_PER_PAGE);
        const data = await fetchAPI(props.fetchEndpoint, String(page), offset, { gender });
        if (data) {
            const transformedData = data.results.map(d => props.dataMapping(d));
            setColumns(transformedData);
            setFilteredColumns(transformedData);
        }
    }

    const searchColumns = async (value: string) => {
        if (value === '') {
            setFilteredColumns(columns);
        } else {
            const searchableFields = findColumns(columns, value);
            setFilteredColumns(searchableFields);
        }
    }

    const _handleSort = (field: string, sorting: Sorting) => {
        const sortByPath = Rambda.pipe(Rambda.path, Rambda.sortBy);
        const sortAscending = sortByPath([field, 'value']);
        const sortDescending = Rambda.pipe(sortAscending as any, Rambda.reverse);
        const result = sorting === Sorting.DESCENDING ? sortDescending(columns) as unknown as any[] : sortAscending(columns);
        const sortedColumns: any[] = Rambda.assocPath([0, field, 'sorting'], sorting, result);
        setFilteredColumns(sortedColumns);
    }

    const _handlePagination = (page: number) => {
        setPage(page);
        fetchUsers(page, filterValue);
    }

    const _handlePreviousPage = () => {
        setPage(prev => {
            prev--;
            fetchUsers(prev, filterValue);
            return prev;
        });
    }

    const _handleNextPage = () => {
        setPage(prev => {
            prev++;
            fetchUsers(prev, filterValue);
            return prev;
        });
    }

    return (
        <Stack direction='column' spacing={4}>
            <SearchAndFilter getSearchValue={setSearchValue} getFilterValue={setFilterValue} />
            <TableWrapper columns={filteredColumns} handleSort={_handleSort} />
            <PaginationButton
                page={page}
                handlePaginateButton={(pageNumber) => _handlePagination(pageNumber)}
                handlePreviousPage={() => _handlePreviousPage()}
                handleNextPage={() => _handleNextPage()}
            />
        </Stack>
    )
}

export default CustomTable;