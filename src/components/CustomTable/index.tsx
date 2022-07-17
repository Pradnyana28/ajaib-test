import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import SearchAndFilter, { FILTER_DEFAULT_VALUE } from '../SearchAndFilter/SearchAndFilter';

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

interface TableData {
    label: string;
    isSearchable: boolean;
    value?: string;
    isNumeric?: boolean;
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

const fetchAPI = async (endpoint: string, options: Record<string, string | undefined>) => {
    const queryString = new URLSearchParams({
        ...options,
        results: String(10),
        page: String(1)
    });
    const response = await fetch(`${endpoint}?${queryString}`);

    if (response.ok) {
        return await response.json() as RandomResponse;
    }
};

const TableContent = ({ data }: { data: TableItem[] }) => {
    const firstItem = data[0];

    const _onHandleSort = (field: string) => {
        console.log(field);
    }

    return (
        <>
            <Thead>
                <Tr>
                    {Object.keys((firstItem)).map(d => <Th key={d} isNumeric={data[0][d].isNumeric} onClick={() => _onHandleSort(d)}>{d}</Th>)}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((d, idx) => (
                    <Tr key={idx}>
                        {Object.keys(d).map(item => <Td key={item} isNumeric={d[item].isNumeric}>{d[item].value}</Td>)}
                    </Tr>
                ))}
            </Tbody>
        </>
    )
}

const CustomTable = (props: CustomTableProps) => {
    const [columns, setColumns] = React.useState<any[]>([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState(FILTER_DEFAULT_VALUE);

    React.useEffect(() => {
        fetchUsers(props.fetchEndpoint);
    }, []);

    React.useEffect(() => {
        if (filterValue === 'all') {
            fetchUsers();
        } else {
            fetchUsers(filterValue);
        }
    }, [filterValue]);

    React.useEffect(() => {
        setTimeout(() => {
            searchData(searchValue);
        }, 750);
    }, [searchValue]);

    const fetchUsers = async (gender?: string) => {
        const data = await fetchAPI(props.fetchEndpoint, { gender });
        if (data) {
            const transformedData = data.results.map(d => props.dataMapping(d));
            setColumns(transformedData);
        }
    }

    const searchData = async (value: string) => {
        if (value === '') {
            fetchUsers(filterValue === 'all' ? undefined : filterValue);
        } else {
            const searchableFields = columns.map(field => {
                const searchFields = Object.keys(field).filter(f =>
                    field[f].isSearchable
                    && field[f].value
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
                return searchFields.length ? field : undefined;
            }).filter(x => x);
            setColumns(searchableFields);
        }
    }

    return (
        <>
            <SearchAndFilter getSearchValue={setSearchValue} getFilterValue={setFilterValue} />
            {columns?.length ? (
                <TableContainer>
                    <Table variant='simple'>
                        <TableContent data={columns} />
                    </Table>
                </TableContainer>
            ) : <p>No data found.</p>}
        </>
    )
}

export default CustomTable;