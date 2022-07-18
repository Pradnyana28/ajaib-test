import React from 'react';
import CustomTable from '../components/CustomTable';
import { Container } from '@chakra-ui/react';

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

const constructTableItem = (label: string, value: string, isSearchable?: boolean, isSortable: boolean = true, isNumeric?: boolean) => ({
  label,
  value,
  isNumeric,
  isSearchable,
  isSortable,
  sorting: 'ASCENDING'
});

const _dataMapping = (response: RandomResponse) => {
  return response.results.map(data => {
    const { login, registered, name, ...rest } = data;
    return {
      username: constructTableItem('Username', login.username, true, false),
      name: constructTableItem('Name', `${name.first} ${name.last}`, true),
      email: constructTableItem('Email', rest.email, true),
      gender: constructTableItem('Gender', rest.gender),
      registered: constructTableItem('Registered Date', new Date(registered.date).toLocaleString())
    }
  });
}

const IndexPage = () => {
  return (
    <Container maxW='1200px'>
      <CustomTable
        fetchEndpoint='https://randomuser.me/api'
        dataMapping={_dataMapping}
      />
    </Container>
  );
};

export default IndexPage;