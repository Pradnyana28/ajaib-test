import React from 'react';
import {
    Stack,
} from '@chakra-ui/react';
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from '../SearchAndFilter/SearchAndFilter';
import * as Rambda from 'rambda';
import PaginationButton from '../PaginationButton';
import TableWrapper from '../TableWrapper';

export enum Sorting {
    DESCENDING = 'DESCENDING',
    ASCENDING = 'ASCENDING'
}

export interface CustomTableProps {
    fetchEndpoint: string;
    dataMapping: (response: any) => Record<string, Record<string, any>>[];

    getSearchValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
    getFilterValue?: React.Dispatch<React.SetStateAction<any>> | ((value: string) => void);
}

const fetchAPI = async (endpoint: string, page: string, pageSize: string, options: Record<string, string | undefined>) => {
    const queryString = new URLSearchParams({
        ...options,
        results: pageSize,
        page: page,
        pageSize: pageSize
    });
    const response = await fetch(`${endpoint}?${queryString}`);

    if (response.ok) {
        return await response.json();
    }
};

const ROWS_SIZE = 5123;
const ROWS_PER_PAGE = 10;
const PAGE_LENGTH = Math.ceil(ROWS_SIZE / ROWS_PER_PAGE);

const sortByPath = Rambda.pipe(Rambda.path, Rambda.sortBy);

const CustomTable = (props: CustomTableProps) => {
    const [columns, setColumns] = React.useState<any[]>([]);
    const [filteredColumns, setFilteredColumns] = React.useState<any[]>([]);
    const [sort, setSort] = React.useState<{ by: string, order: Sorting }>();
    const [page, setPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState(null);
    const [filterValue, setFilterValue] = React.useState(FILTER_DEFAULT_VALUE);

    React.useEffect(() => {
        if (filterValue === 'all') {
            fetchData(page);
        } else {
            fetchData(page, filterValue, searchValue);
        }
    }, [filterValue]);

    React.useEffect(() => {
        if (searchValue !== null) {
            setTimeout(() => {
                fetchData(page, filterValue, searchValue);
            }, 750);
        }
    }, [searchValue]);

    const fetchData = async (page: number, gender?: string, searchValue?: string | null, sort?: { by: string; order: Sorting }) => {
        const pageNumberFloor = Math.floor(ROWS_SIZE / ROWS_PER_PAGE);
        const offset = page > pageNumberFloor ? (ROWS_SIZE / ROWS_PER_PAGE).toString().split('.')[1][0] : String(ROWS_PER_PAGE);
        const options = {
            ...(gender && gender !== FILTER_DEFAULT_VALUE ? { gender } : undefined),
            ...(searchValue ? { keyword: searchValue } : undefined),
            ...(sort ? { sortBy: sort.by, sortOrder: sort.order.toLowerCase() } : undefined)
        };
        const data = await fetchAPI(props.fetchEndpoint, String(page), offset, options);
        if (data) {
            const transformedData = props.dataMapping(data);
            setColumns(transformedData);
            if (sort) {
                const sortAscending = sortByPath([sort.by, 'value']);
                const sortDescending = Rambda.pipe(sortAscending as any, Rambda.reverse);
                const result = sort.order === Sorting.DESCENDING ? sortDescending(columns) as unknown as any[] : sortAscending(columns);
                const sortedColumns: any[] = Rambda.assocPath([0, sort.by, 'sorting'], sort.order, result);
                setFilteredColumns(sortedColumns);
            } else {
                setFilteredColumns(transformedData);
            }
        }
    }

    const _handleSort = (field: string, sorting: Sorting) => {
        setSort({ by: field, order: sorting });
        fetchData(page, filterValue, searchValue, sort);
    }

    const _handlePagination = (page: number) => {
        setPage(page);
        fetchData(page, filterValue, searchValue, sort);
    }

    const _handlePreviousPage = () => {
        setPage(prev => {
            prev--;
            fetchData(page, filterValue, searchValue, sort);
            return prev;
        });
    }

    const _handleNextPage = () => {
        setPage(prev => {
            prev++;
            fetchData(page, filterValue, searchValue, sort);
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