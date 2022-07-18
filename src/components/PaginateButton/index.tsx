import React from 'react';
import PageButton from '../PageButton';

const PaginateButton = (props: {
    totalPage: number;
    handlePaginateButton?: (pageNumber: number) => void;
}) => {
    return (
        <>
            {Array.from({ length: props.totalPage }, (v, i) => i + 1).map((pageNumber) => {
                if (props.totalPage > 10) {
                    if (pageNumber <= 6 || pageNumber >= props.totalPage - 4) {
                        return <PageButton key={pageNumber} pageNumber={pageNumber} handlePaginateButton={props.handlePaginateButton} />;
                    }

                    if (pageNumber === 7) {
                        return <p key={pageNumber}>...</p>
                    }
                } else {
                    return <PageButton key={pageNumber} pageNumber={pageNumber} handlePaginateButton={props.handlePaginateButton} />;
                }
            })}
        </>
    );
};

export default PaginateButton;