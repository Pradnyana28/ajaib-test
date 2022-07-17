import React from 'react';
import CustomTable from '../components/CustomTable';
import { Container } from '@chakra-ui/react'

const IndexPage = () => {
  return (
    <div>
      <Container maxW='1200px'>
        <CustomTable />
      </Container>
    </div>
  );
};

export default IndexPage;