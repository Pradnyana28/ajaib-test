import React, { useContext } from 'react';
import {
    Button,
} from '@chakra-ui/react';
import { CustomTableContext } from '../../store/customTable';

const PageButton = (props: {
    pageNumber: number;
    handlePaginateButton?: (pageNumber: number) => void;
}) => {
    const { state } = useContext(CustomTableContext);

    return (
        <Button
            size='sm'
            isActive={state.page === props.pageNumber}
            onClick={() => props.handlePaginateButton && props.handlePaginateButton(props.pageNumber)}
        >{props.pageNumber}</Button>
    );
};

export default PageButton;