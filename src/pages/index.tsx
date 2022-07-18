import React from 'react';
import CustomTable, { RandomData } from '../components/CustomTable';
import { Container } from '@chakra-ui/react'

const constructTableItem = (label: string, value: string, isSearchable?: boolean, isSortable: boolean = true, isNumeric?: boolean) => ({
  label,
  value,
  isNumeric,
  isSearchable,
  isSortable,
  sorting: 'ASCENDING'
});

const _dataMapping = (data: RandomData) => {
  const { login, registered, name, ...rest } = data;
  return {
    username: constructTableItem('Username', login.username, true, false),
    name: constructTableItem('Name', `${name.first} ${name.last}`, true),
    email: constructTableItem('Email', rest.email, true),
    gender: constructTableItem('Gender', rest.gender),
    registered: constructTableItem('Registered Date', new Date(registered.date).toLocaleString())
  }
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