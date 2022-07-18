import React, { useContext } from 'react';
import {
    Stack,
} from '@chakra-ui/react';
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from '../SearchAndFilter/SearchAndFilter';
import * as Rambda from 'rambda';
import PaginationButton from '../PaginationButton';
import TableWrapper from '../TableWrapper';
import { CustomTableContext } from '../../store/customTable';

export enum Sorting {
    DESCENDING = 'DESCENDING',
    ASCENDING = 'ASCENDING'
}

export interface CustomTableProps {
    fetchEndpoint: string;
    dataMapping: (response: any) => Record<string, Record<string, any>>[];
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

const sortByPath = Rambda.pipe(Rambda.path, Rambda.sortBy);
const sortBy = (by: string, order: Sorting, data: any[]) => {
    const sortAscending = sortByPath([by, 'value']);
    const sortDescending = Rambda.pipe(sortAscending as any, Rambda.reverse);
    const result = order === Sorting.DESCENDING
        ? sortDescending(data) as unknown as any[]
        : sortAscending(data);
    const sortedColumns: any[] = Rambda.assocPath([0, by, 'sorting'], order, result);
    return sortedColumns;
};

const ROWS_SIZE = 1000;
const ROWS_PER_PAGE = 10;
const PAGE_LENGTH = Math.ceil(ROWS_SIZE / ROWS_PER_PAGE);

const CustomTable = (props: CustomTableProps) => {
    const { state } = useContext(CustomTableContext);

    const [filteredColumns, setFilteredColumns] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetchData(state as any);
    }, [state]);

    const fetchData = async (
        store: typeof state
    ) => {
        const pageNumberFloor = Math.floor(ROWS_SIZE / ROWS_PER_PAGE);
        const offset = store.page > pageNumberFloor ? (ROWS_SIZE / ROWS_PER_PAGE).toString().split('.')[1][0] : String(ROWS_PER_PAGE);
        const options = {
            ...(store.filterValue && store.filterValue !== FILTER_DEFAULT_VALUE ? { gender: store.filterValue } : undefined),
            ...(store.searchValue ? { keyword: store.searchValue } : undefined),
            ...(store.sort ? { sortBy: store.sort.by, sortOrder: store.sort.order.toLowerCase() } : undefined)
        };
        const data = await fetchAPI(props.fetchEndpoint, String(store.page), offset, options);
        if (data) {
            const transformedData = props.dataMapping(data);
            if (store.sort) {
                setFilteredColumns(
                    sortBy(store.sort.by, store.sort.order, transformedData)
                );
            } else {
                setFilteredColumns(transformedData);
            }
        }
    }

    return (
        <Stack direction='column' spacing={4}>
            <SearchAndFilter />
            <TableWrapper data={filteredColumns} />
            <PaginationButton totalPage={PAGE_LENGTH} />
        </Stack>
    )
}

export default CustomTable;