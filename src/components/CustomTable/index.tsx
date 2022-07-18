import React from 'react';
import {
    Stack,
} from '@chakra-ui/react';
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from '../SearchAndFilter/SearchAndFilter';
import * as Rambda from 'rambda';
import PaginationButton from '../PaginationButton';
import TableWrapper from '../TableWrapper';

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

const ROWS_SIZE = 5123;
const ROWS_PER_PAGE = 10;
const PAGE_LENGTH = Math.ceil(ROWS_SIZE / ROWS_PER_PAGE);

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
            <TableWrapper data={filteredColumns} handleSort={_handleSort} />
            <PaginationButton
                page={page}
                totalPage={PAGE_LENGTH}
                handlePaginateButton={(pageNumber) => _handlePagination(pageNumber)}
                handlePreviousPage={() => _handlePreviousPage()}
                handleNextPage={() => _handleNextPage()}
            />
        </Stack>
    )
}

export default CustomTable;