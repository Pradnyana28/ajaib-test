import React, { useContext } from 'react';
import {
    Flex,
    IconButton,
    Stack,
    Spacer,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PaginateButton from '../PaginateButton';
import { CustomTableContext } from '../../store/customTable';

const PaginationButton = (props: {
    totalPage: number;
}) => {
    const { state, update } = useContext(CustomTableContext);

    const _handlePagination = (page: number) => {
        update({
            ...state,
            page: page
        });
    }

    const _handlePreviousPage = () => {
        update({
            ...state,
            page: --state.page
        });
    }

    const _handleNextPage = () => {
        update({
            ...state,
            page: ++state.page
        });
    }

    return (
        <Flex minWidth='max-content'>
            <p>Page <b>{state.page}</b> of {props.totalPage}</p>
            <Spacer />
            <Stack spacing={1} direction='row' align='center'>
                <IconButton
                    aria-label='Previous page'
                    isActive={state.page <= 1}
                    size='sm'
                    onClick={state.page > 1 ? _handlePreviousPage : undefined} icon={<ChevronLeftIcon />}
                />
                <PaginateButton
                    totalPage={props.totalPage}
                    handlePaginateButton={(pageNumber) => _handlePagination(pageNumber)}
                />
                <IconButton
                    aria-label='Next page'
                    isActive={state.page >= props.totalPage}
                    size='sm' onClick={state.page < props.totalPage ? _handleNextPage : undefined}
                    icon={<ChevronRightIcon />} />
            </Stack>
        </Flex>
    )
}

export default PaginationButton;