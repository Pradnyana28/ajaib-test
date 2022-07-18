import React from 'react';
import {
    Button,
} from '@chakra-ui/react';

const PageButton = (props: {
    page: number;
    pageNumber: number;
    handlePaginateButton: (pageNumber: number) => void;
}) => <Button size='sm' isActive={props.page === props.pageNumber} onClick={() => props.handlePaginateButton(props.pageNumber)}>{props.pageNumber}</Button>;

export default PageButton;