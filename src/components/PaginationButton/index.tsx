import React from 'react';
import {
    Flex,
    IconButton,
    Stack,
    Spacer,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PaginateButton from '../PaginateButton';

const PaginationButton = (props: {
    page: number;
    totalPage: number;
    handlePreviousPage?: () => void;
    handleNextPage?: () => void;
    handlePaginateButton?: (pageNumber: number) => void
}) => {
    return (
        <Flex minWidth='max-content'>
            <p>Page <b>{props.page}</b> of {props.totalPage}</p>
            <Spacer />
            <Stack spacing={1} direction='row' align='center'>
                <IconButton
                    aria-label='Previous page'
                    isActive={props.page <= 1}
                    size='sm'
                    onClick={props.page > 1 ? props.handlePreviousPage : undefined} icon={<ChevronLeftIcon />}
                />
                <PaginateButton
                    totalPage={props.totalPage}
                    page={props.page}
                    handlePaginateButton={props.handlePaginateButton}
                />
                <IconButton
                    aria-label='Next page'
                    isActive={props.page >= props.totalPage}
                    size='sm' onClick={props.page < props.totalPage ? props.handleNextPage : undefined}
                    icon={<ChevronRightIcon />} />
            </Stack>
        </Flex>
    )
}

export default PaginationButton;