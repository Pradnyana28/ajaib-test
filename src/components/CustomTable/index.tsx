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

const CustomTable = (props: CustomTableProps) => {
    const [users, setUsers] = React.useState<any[]>([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState(FILTER_DEFAULT_VALUE);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    React.useEffect(() => {
        if (filterValue === 'all') {
            fetchUsers();
        } else {
            fetchUsers(filterValue);
        }
    }, [filterValue]);

    const _onHandleSort = (field: string) => {
        console.log(field);
    }

    const fetchUsers = async (gender?: string) => {
        const queryString = new URLSearchParams({
            ...(gender ? { gender: gender } : undefined),
            results: String(10),
            page: String(1),
            inc: 'name,gender,login,registered,email'
        });
        const response = await fetch(`${props.fetchEndpoint}?${queryString}`);

        if (response.ok) {
            const data = await response.json() as RandomResponse;
            const transformedData = data.results.map(d => props.dataMapping(d));
            setUsers(transformedData);
        }
    };

    const renderDataTable = (data: TableItem[]) => {
        const firstItem = data[0];
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

    return (
        <>
            <SearchAndFilter getSearchValue={setSearchValue} getFilterValue={setFilterValue} />
            {users?.length ? (
                <TableContainer>
                    <Table variant='simple'>
                        {renderDataTable(users)}
                    </Table>
                </TableContainer>
            ) : <p>Table wrongly initiated.</p>}
        </>
    )
}

export default CustomTable;