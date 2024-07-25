import * as St from './Pagination.style';
import { useState } from 'react';

const Pagination = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const changePage = (index) => {
        setCurrentPage(index);
    };
    return (
        <St.PagesContainer>
            {pages.map((pageNumber) => (
                <St.Page
                    onClick={() => changePage(pageNumber)}
                    key={pageNumber}
                    $isCurrentPage={currentPage === pageNumber ? true : false}
                />
            ))}
        </St.PagesContainer>
    );
};

export default Pagination;
